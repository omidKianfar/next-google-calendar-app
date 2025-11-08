"use client";

import { useRouter } from "next/navigation";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalContainer from "@/components/atom/modal";
import { useGoogleCalendar } from "@/hooks/use-google-calendar";
import CreateEvent from "./create/create-event";
import { CalendarHeader } from "./header/header";
import DetailComponent from "./detail";
import Signin from "./signin";

export default function CalendarComponent() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState<number | null>(null);
  const router = useRouter();

  const { events, calendarId, createEvent, updateEvent, deleteEvent } =
    useGoogleCalendar(accessToken);

  const login = useGoogleLogin({
    flow: "implicit",
    scope:
      "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events openid email",
    onSuccess: (res) => setAccessToken(res.access_token),
    onError: (err) => console.error(err),
  });

  const handleLogout = () => {
    googleLogout();
    setAccessToken(null);
    router.push("/calendar");
  };

  const handleOpenModal = (id: number) => {
    setModalId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handelSeeEventDetail = (info: any) => {
    setSelectedEvent({
      id: info.event.id,
      summary: info.event.title,
      description: info.event.extendedProps.description ?? "",
      start: { dateTime: info.event.start?.toISOString() },
      end: { dateTime: info.event.end?.toISOString() },
      creator: { email: info.event.extendedProps.creator ?? "" },
      htmlLink: info.event.extendedProps.htmlLink ?? "",
    });
    handleOpenModal(1);
  };

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
    handleOpenModal(2);
  };

  const handleCreateEvent = async (eventData: any) => {
    handleCloseModal();
    await createEvent(eventData);
  };

  const handleEditEvent = async (id: string, data: any) => {
    handleCloseModal();
    await updateEvent(id, data);
  };

  const handleDeleteEvent = async (id: string) => {
    handleCloseModal();
    await deleteEvent(id);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {!accessToken || !calendarId ? (
        <Signin login={login} />
      ) : (
        <>
          <CalendarHeader onLogout={handleLogout} />

          <div className="bg-white rounded-xl shadow p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handelSeeEventDetail}
              dateClick={handleDateClick}
              height="80vh"
              selectable
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              eventDidMount={(info) => {
                info.el.style.cursor = "pointer";
              }}
            />
          </div>

          <ModalContainer open={open} handleClose={handleCloseModal}>
            {modalId === 1 && selectedEvent && (
              <DetailComponent
                event={selectedEvent}
                onDelete={handleDeleteEvent}
                onEdit={handleEditEvent}
              />
            )}
            {modalId === 2 && selectedDate && (
              <CreateEvent
                selectedDate={selectedDate}
                onCreate={handleCreateEvent}
                onClose={handleCloseModal}
              />
            )}
          </ModalContainer>
        </>
      )}
    </div>
  );
}

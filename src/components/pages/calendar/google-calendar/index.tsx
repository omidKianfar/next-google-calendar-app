"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { lazy, Suspense, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import ModalContainer from "@/components/atom/modal";
import { useGoogleCalendar } from "@/hooks/use-google-calendar";
import { CalendarHeader } from "./header/header";
import Signin from "./signin";
import { LoadingSpinner } from "@/components/atom/loading/spinner";
import { CalendarSkeleton } from "@/components/atom/loading/calendar-skeleton";
import { CalendarEvent } from "./type";
import { EventClickArg } from "@fullcalendar/core";

const FullCalendar = lazy(() => import("@fullcalendar/react"));
const LogoutModal = lazy(() => import("./modals/logout"));
const DetailModal = lazy(() => import("./modals/detail"));
const CreateEventModal = lazy(() => import("./modals/create"));

export default function CalendarComponent() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState<number | null>(null);

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
    handleOpenModal(3);
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

  const handelSeeEventDetail = (info: EventClickArg) => {

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

  const handleDateClick = (info: DateClickArg ) => {
    setSelectedDate(info.dateStr);
    handleOpenModal(2);
  };

  const handleCreateEvent = async (eventData: CalendarEvent) => {
    await createEvent(eventData);
    handleCloseModal();
  };

  const handleEditEvent = async (id: string, data: CalendarEvent) => {
    await updateEvent(id, data);
    handleCloseModal();
  };

  const handleDeleteEvent = async (id: string) => {
    await deleteEvent(id);
    handleCloseModal();
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {!accessToken || !calendarId ? (
        <Signin login={login} />
      ) : (
        <>
          <CalendarHeader onLogout={handleLogout} />

          <div className="bg-white rounded-xl shadow p-4">
            <Suspense fallback={<CalendarSkeleton />}>
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
            </Suspense>
          </div>

          <ModalContainer open={open} handleClose={handleCloseModal}>
            <Suspense fallback={<LoadingSpinner />}>
              {modalId === 1 && selectedEvent && (
                <DetailModal
                  event={selectedEvent}
                  onDelete={handleDeleteEvent}
                  onEdit={handleEditEvent}
                />
              )}
              {modalId === 2 && selectedDate && (
                <CreateEventModal
                  selectedDate={selectedDate}
                  onCreate={handleCreateEvent}
                  onClose={handleCloseModal}
                />
              )}
            </Suspense>
            {modalId === 3 && (
              <LogoutModal
                onClose={handleCloseModal}
                setAccessToken={setAccessToken}
              />
            )}
          </ModalContainer>
        </>
      )}
    </div>
  );
}

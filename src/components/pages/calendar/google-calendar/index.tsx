"use client";
import { useRouter } from "next/navigation";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarHeader } from "./header";
import { useGoogleCalendar } from "@/hooks/use-google-calendar";

export default function CalendarComponent() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const router = useRouter();

  const { events, calendarId } = useGoogleCalendar(accessToken);

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

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {!accessToken || !calendarId ? (
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={() => login()}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          <CalendarHeader onLogout={handleLogout} />

          <div className="bg-white rounded-xl shadow p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height="80vh"
              selectable
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

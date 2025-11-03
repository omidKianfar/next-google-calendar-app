"use client";
import { useEffect, useState } from "react";

export function useGoogleCalendar(accessToken: string | null) {
  const [calendarId, setCalendarId] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchCalendarId = async () => {
      try {
        const result = await fetch(
          "https://www.googleapis.com/calendar/v3/users/me/calendarList",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const response = await result.json();

        const primary =
          response.items.find((item: any) => item.primary) || response.items[0];

        setCalendarId(primary.id);
      } catch (err) {
        console.error("Failed to get calendar ID", err);
      }
    };

    fetchCalendarId();
  }, [accessToken]);

  useEffect(() => {
    if (!calendarId || !accessToken) return;

    const fetchEvents = async () => {
      try {
        const result = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const response = await result.json();

        const items = response.items.map((item: any) => ({
          id: item.id,
          title: item.summary,
          description: item.description,
          start: item.start.dateTime || item.start.date,
          end: item.end.dateTime || item.end.date,
          creator: item.creator?.email,
          htmlLink: item.htmlLink,
          location: item.location,
        }));

        setEvents(items);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, [calendarId, accessToken]);

  return {
    events,
    calendarId,
  };
}

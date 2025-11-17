"use client";
import { CalendarEvent } from "@/components/pages/calendar/google-calendar/type";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

export function useGoogleCalendar(accessToken: string | null) {
  const { enqueueSnackbar } = useSnackbar();

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

        if (!result.ok) {
          throw new Error(`Error: ${result.status} - ${result.statusText}`);
        }

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

        if (!result.ok) {
          throw new Error(`Error: ${result.status} - ${result.statusText}`);
        }

        const response = await result.json();

        const items = response.items.map((item: any) => ({
          id: item.id,
          title: item.summary,
          description: item.description,
          start: item.start.dateTime || item.start.date,
          end: item.end.dateTime || item.end.date,
          creator: item.creator?.email,
          htmlLink: item.htmlLink,
        }));

        setEvents(items);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, [calendarId, accessToken]);

  const fetchEvents = async () => {
    try {
      const result = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!result.ok) {
        throw new Error(`Error: ${result.status} - ${result.statusText}`);
      }

      const response = await result.json();

      const items = response.items.map((item: any) => ({
        id: item.id,
        title: item.summary,
        description: item.description,
        start: item.start.dateTime || item.start.date,
        end: item.end.dateTime || item.end.date,
        creator: item.creator?.email,
        htmlLink: item.htmlLink,
      }));

      setEvents(items);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const createEvent = async (data: CalendarEvent) => {
    if (!calendarId || !accessToken) return;
    try {
      const result = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify(data),
        }
      );

      if (!result.ok) {
        throw new Error(`Error: ${result.status} - ${result.statusText}`);
      }

      await fetchEvents();

      enqueueSnackbar("Your event was created successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(`Error: ${err}.Please try again.`, {
        variant: "error",
      });
    }
  };

  const updateEvent = async (id: string, data: CalendarEvent) => {
    if (!calendarId || !accessToken) return;
    try {
      const result = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify(data),
        }
      );

      if (!result.ok) {
        throw new Error(`Error: ${result.status} - ${result.statusText}`);
      }

      await fetchEvents();

      enqueueSnackbar("Your event was updated successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(`Error: ${err}.Please try again.`, {
        variant: "error",
      });
    }
  };

  const deleteEvent = async (id: string) => {
    if (!calendarId || !accessToken) return;
    try {
      const result = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!result.ok) {
        throw new Error(`Error: ${result.status} - ${result.statusText}`);
      }

      await fetchEvents();

      enqueueSnackbar("Your event was deleted successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(`Error: ${err}.Please try again.`, {
        variant: "error",
      });
    }
  };

  return {
    events,
    calendarId,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}

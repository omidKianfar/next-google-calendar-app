"use client";
import { EventDetailProps } from "./type";

export default function EventDetailModal({ event }: EventDetailProps) {
  if (!event) return null;

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold mb-4">Event Details</h2>

      <>
        <p className="text-lg font-medium mb-1">
          {event.summary || "Untitled Event"}
        </p>
        <p className="text-gray-600 mb-1">
          <b>Start:</b>{" "}
          {event.start?.dateTime
            ? new Date(event.start.dateTime).toLocaleString()
            : "—"}
        </p>
        <p className="text-gray-600 mb-1">
          <b>End:</b>{" "}
          {event.end?.dateTime
            ? new Date(event.end.dateTime).toLocaleString()
            : "—"}
        </p>
        {event.description && (
          <p className="text-gray-700 mb-1">
            <b>Description:</b> {event.description}
          </p>
        )}
        {event.location && (
          <p className="text-gray-700 mb-1">
            <b>Location:</b> {event.location}
          </p>
        )}
        {event.creator?.email && (
          <p className="text-gray-700 mb-3">
            <b>Creator:</b> {event.creator.email}
          </p>
        )}
      </>
    </div>
  );
}

"use client";
import { useState } from "react";
import { EventDetailProps } from "./type";

export default function EventDetailModal({
  event,
  onClose,
  onDelete,
  onEdit,
}: EventDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState(event?.summary || "");
  const [description, setDescription] = useState(event?.description || "");
  const [location, setLocation] = useState(event?.location || "");

  if (!event) return null;

  const handleSave = () => {
    const updatedEvent = {
      summary,
      description,
      location,
      start: event.start,
      end: event.end,
    };

    onEdit(event.id ?? "", updatedEvent);
    setIsEditing(false);
  };

  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Event" : "Event Details"}
      </h2>

      {isEditing ? (
        <>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            placeholder="Description"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            placeholder="Location"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </>
      ) : (
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

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this event?"))
                  onDelete(event.id ?? "");
              }}
              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

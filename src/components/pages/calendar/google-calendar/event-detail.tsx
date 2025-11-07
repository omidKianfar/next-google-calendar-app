"use client";
import { useState, useMemo } from "react";
import { EventDetailProps } from "./type";

export default function EventDetailModal({
  event,
  onDelete,
  onEdit,
}: EventDetailProps) {
  const [isEditing, setIsEditing] = useState(false);

  const initialStartTime = useMemo(() => {
    if (!event?.start?.dateTime) return "";
    const d = new Date(event.start.dateTime);
    return d.toISOString().substring(11, 16);
  }, [event]);

  const initialEndTime = useMemo(() => {
    if (!event?.end?.dateTime) return "";
    const d = new Date(event.end.dateTime);
    return d.toISOString().substring(11, 16);
  }, [event]);

  const [summary, setSummary] = useState(event?.summary || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  if (!event) return null;

  const handleSave = () => {
    if (!summary) return alert("Title is required");
    if (!startTime || !endTime) return alert("Start and end time are required");
    if (endTime <= startTime) return alert("End time must be after start time");

    const dateStr = event?.start?.dateTime?.split("T")[0];

    const updatedEvent = {
      summary,
      description,
      start: {
        dateTime: new Date(`${dateStr}T${startTime}:00`).toISOString(),
      },
      end: {
        dateTime: new Date(`${dateStr}T${endTime}:00`).toISOString(),
      },
    };

    onEdit(event.id ?? "", updatedEvent);
    setIsEditing(false);
  };

  const deleteHandler = () => {
    onDelete(event.id ?? "");
  };

  return (
    <div className="p-3">
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
            rows={3}
          />

          <div>
            <label className="text-sm text-gray-700">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border rounded p-2 mb-3"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border rounded p-2 mb-3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-500 text-white"
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
              ? new Date(event.start.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </p>

          <p className="text-gray-600 mb-1">
            <b>End:</b>{" "}
            {event.end?.dateTime
              ? new Date(event.end.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—"}
          </p>

          {event.description && (
            <p className="text-gray-700 mb-1">
              <b>Description:</b> {event.description}
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
              onClick={deleteHandler}
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

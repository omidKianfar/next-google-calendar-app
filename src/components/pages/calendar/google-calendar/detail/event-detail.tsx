import React from "react";
import { EventDetailProps, EventEditProps } from "../type";

const EventDetail = ({
  event,
  onDelete,
  setIsEditing,
}: EventDetailProps & EventEditProps) => {
  if (!event) return null;

  return (
    <div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(event.id ?? "")}
          className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      <div className=" mb-4">
        <label className="text-sm text-gray-700 mb-1">Summary</label>

        <p className="text-gray-600">{event?.summary || "Untitled Event"}</p>
      </div>

      <div className=" mb-4">
        <label className="text-sm text-gray-700 mb-1">Start</label>

        <p className="text-gray-600">
          {event?.start?.dateTime
            ? new Date(event?.start?.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm text-gray-700 mb-1">End</label>

        <p className="text-gray-600">
          {event?.end?.dateTime
            ? new Date(event?.end?.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm text-gray-700 mb-1">Description</label>

        <p className="text-gray-600">
          {event?.description ? event?.description : "—"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm text-gray-700 mb-1">Creator</label>

        <p className="text-gray-600">
          {event?.creator?.email ? event?.creator?.email : "—"}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;

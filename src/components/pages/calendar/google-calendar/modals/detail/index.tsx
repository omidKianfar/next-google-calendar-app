"use client";
import { useState } from "react";
import { EventDetailProps } from "../../type";
import EventEdit from "./event-edit";
import EventDetail from "./event-detail";

const DetailModal = ({ event, onDelete, onEdit }: EventDetailProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!event) return null;

  return (
    <div className="p-3">
      <h2 className="text-lg font-semibold mb-4 text-orange-400">
        {isEditing ? "Edit Event" : "Event Details"}
      </h2>

      {isEditing ? (
        <EventEdit event={event} onEdit={onEdit} setIsEditing={setIsEditing} />
      ) : (
        <>
          <EventDetail
            event={event}
            setIsEditing={setIsEditing}
            onDelete={onDelete}
          />
        </>
      )}
    </div>
  );
};

export default DetailModal;

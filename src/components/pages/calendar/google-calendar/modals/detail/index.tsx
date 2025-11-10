"use client";
import { lazy, Suspense, useState } from "react";
import { EventDetailProps } from "../../type";
import { LoadingSpinner } from "@/components/atom/loading/spinner";

const EventEdit = lazy(() => import("./edit/event-edit"));
const EventDetail = lazy(() => import("./detail/event-detail"));

const DetailModal = ({ event, onDelete, onEdit }: EventDetailProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (!event) return null;

  
  return (
    <div className="p-3">
      <h2 className="text-lg font-semibold mb-4 text-orange-400">
        {isEditing ? "Edit Event" : "Event Details"}
      </h2>
      <Suspense fallback={<LoadingSpinner />}>
        {isEditing ? (
          <EventEdit
            event={event}
            onEdit={onEdit}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <EventDetail
              event={event}
              setIsEditing={setIsEditing}
              onDelete={onDelete}
            />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default DetailModal;

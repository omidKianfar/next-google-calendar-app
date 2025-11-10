import { lazy, Suspense, useState } from "react";
import { CalendarEvent, EventProps } from "../../../type";
import EditBody from "./body";
import { LoadingSpinner } from "@/components/atom/loading/spinner";

const SureEditModal = lazy(() => import("./modal"));

const EventEdit = ({
  event,
  onEdit,
  setIsEditing,
}: Pick<EventProps, "event" | "onEdit" | "setIsEditing">) => {
  const [sureModal, setSureModal] = useState<boolean>(false);
  const [eventId, setEventId] = useState<string>("");
  const [newEvent, setNewEvent] = useState<CalendarEvent | null>(null);

  const sureHandler = () => {
    if (newEvent) {
      onEdit(eventId, newEvent);
      setNewEvent(null);
      setIsEditing?.(false);
    }
  };

  return (
    <>
      {!sureModal ? (
        <EditBody
          event={event}
          setIsEditing={setIsEditing}
          setEventId={setEventId}
          setNewEvent={setNewEvent}
          setSureModal={setSureModal}
        />
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <SureEditModal
            newEvent={newEvent}
            setSureModal={setSureModal}
            sureHandler={sureHandler}
          />
        </Suspense>
      )}
    </>
  );
};

export default EventEdit;

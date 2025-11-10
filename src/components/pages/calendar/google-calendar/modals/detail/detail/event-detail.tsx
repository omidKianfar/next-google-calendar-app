"use client ";

import { useState } from "react";
import DetailHeader from "./header";
import DetailBody from "./body";
import SureDeleteModal from "./modal";
import { EventProps } from "../../../type";

const EventDetail = ({
  event,
  onDelete,
  setIsEditing,
}: Pick<EventProps, "event" | "onDelete" | "setIsEditing">) => {
  const [sureModal, setSureModal] = useState<boolean>(false);

  if (!event) return null;

  const sureHandler = () => {
    onDelete?.(event.id ?? "");
  };

  return (
    <>
      {!sureModal ? (
        <div>
          <DetailHeader
            setIsEditing={setIsEditing}
            setSureModal={setSureModal}
          />

          <DetailBody event={event} />
        </div>
      ) : (
        <SureDeleteModal
          sureHandler={sureHandler}
          setSureModal={setSureModal}
        />
      )}
    </>
  );
};

export default EventDetail;

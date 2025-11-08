"use client ";

import { useState } from "react";
import { EventDetailProps, EventEditProps } from "../../type";
import { Pencil, Trash2 } from "lucide-react";
import SureDeleteModal from "./modal/sure-delete-modal";

const EventDetail = ({
  event,
  onDelete,
  setIsEditing,
}: EventDetailProps & EventEditProps) => {
  const [sureModal, setSureModal] = useState<boolean>(false);

  if (!event) return null;

  const sureHandler = () => {
    onDelete?.(event.id ?? "");
  };

  return (
    <>
      {!sureModal ? (
        <div>
          <div className="flex justify-end ">
            <button
              onClick={() => setIsEditing(true)}
              className="py-1 px-2 mr-1 rounded-sm hover:bg-gray-100 "
            >
              <Pencil className="text-blue-400 hover:text-blue-600 cursor-pointer w-5" />
            </button>

            <button
              onClick={() => setSureModal(true)}
              className="py-1 px-2 rounded-sm hover:bg-gray-100 "
            >
              <Trash2 className="text-red-400 hover:text-red-600 cursor-pointer w-5" />
            </button>
          </div>

          <hr className="my-2 border-1 border-orange-300" />

          <div className=" mb-4">
            <label className="text-sm mb-1 font-bold text-blue-400">
              Summary
            </label>

            <p className="text-gray-600 break-normal">
              {event?.summary || "Untitled Event"}
            </p>
          </div>

          <div className=" mb-4">
            <label className="text-sm font-bold text-blue-400 mb-1">
              Start
            </label>

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
            <label className="text-sm font-bold text-blue-400 mb-1">End</label>

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
            <label className="text-sm font-bold text-blue-400 mb-1">
              Description
            </label>

            <p className="text-gray-600 break-normal">
              {event?.description ? event?.description : "—"}
            </p>
          </div>

          <div className=" mb-4">
            <label className="text-sm font-bold text-blue-400 mb-1">
              Creator
            </label>

            <p className="text-gray-600">
              {event?.creator?.email ? event?.creator?.email : "—"}
            </p>
          </div>
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

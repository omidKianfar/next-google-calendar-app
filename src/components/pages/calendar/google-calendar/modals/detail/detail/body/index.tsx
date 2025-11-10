import React from "react";
import { EventProps } from "../../../../type";
import dayjs from "dayjs";

const DetailBody = ({ event }: Pick<EventProps, "event">) => {
  return (
    <div>
      <div className=" mb-4">
        <label className="text-sm mb-1 font-bold text-blue-400">Summary</label>

        <p className="text-gray-600 break-normal">
          {event?.summary || "Untitled Event"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm font-bold text-blue-400 mb-1">Start</label>

        <p className="text-gray-600">
          {event?.start.dateTime
            ? dayjs(event?.start.dateTime).format("hh:mm A")
            : "—"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm font-bold text-blue-400 mb-1">End</label>

        <p className="text-gray-600">
          {event?.end.dateTime
            ? dayjs(event?.end.dateTime).format("hh:mm A")
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
        <label className="text-sm font-bold text-blue-400 mb-1">Creator</label>

        <p className="text-gray-600">
          {event?.creator?.email ? event?.creator?.email : "—"}
        </p>
      </div>
    </div>
  );
};

export default DetailBody;

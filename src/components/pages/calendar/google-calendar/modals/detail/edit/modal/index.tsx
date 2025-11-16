import dayjs from "dayjs";
import { EventProps } from "../../../../type";

const SureEditModal = ({
  sureHandler,
  setSureModal,
  newEvent,
}: Pick<EventProps, "sureHandler" | "setSureModal" | "newEvent">) => {
  return (
    <div className="w-full">
      <div>
        <h2 className="text-md  mb-4 flex justify-center">
          Are you sure to update the event?
        </h2>
      </div>

      <div className=" mb-4">
        <label className="text-sm mb-1 font-bold text-blue-400">Summary</label>

        <p className="text-gray-600 break-normal">
          {newEvent?.summary || "Untitled Event"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm font-bold text-blue-400 mb-1">Start</label>

        <p className="text-gray-600">
          {newEvent?.start.dateTime
            ? dayjs(newEvent?.start.dateTime).format("hh:mm A")
            : "—"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm font-bold text-blue-400 mb-1">End</label>

        <p className="text-gray-600">
          {newEvent?.end.dateTime
            ? dayjs(newEvent?.end.dateTime).format("hh:mm A")
            : "—"}
        </p>
      </div>

      <div className=" mb-4">
        <label className="text-sm font-bold text-blue-400 mb-1">
          Description
        </label>

        <p className="text-gray-600 break-normal">
          {newEvent?.description ? newEvent?.description : "—"}
        </p>
      </div>

      <div className="flex justify-center mt-4  w-full">
        <button
          type="button"
          onClick={() => setSureModal(false)}
          className="mr-4 px-8 py-2 bg-orange-500 text-white 
          cursor-pointer rounded-md border-2 hover:bg-transparent
          hover:border-orange-500 hover:text-orange-500 "
        >
          Back
        </button>

        <button
          onClick={sureHandler}
          className=" px-8 py-2 bg-blue-500 text-white 
          cursor-pointer rounded-md border-2 hover:bg-transparent
          hover:border-blue-500 hover:text-blue-500 "
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default SureEditModal;

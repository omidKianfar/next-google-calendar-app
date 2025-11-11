import { EventProps } from "../../../../type";

const SureDeleteModal = ({
  sureHandler,
  setSureModal,
}: Pick<EventProps, "sureHandler" | "setSureModal">) => {
  return (
    <div className="w-full">
      <div>
        <h2 className="text-md  mb-4 flex justify-center">
          Are you sure to delete the event?
        </h2>
      </div>

      <div className="flex justify-center mt-4  w-full">
        <button
          type="button"
          onClick={() => setSureModal(false)}
          className="mr-4 px-8 py-2 bg-orange-500 text-white 
          cursor-pointer rounded-md border-2 hover:bg-transparent
          hover:border-orange-500 hover:text-orange-500 "
        >
          Cancel
        </button>

        <button
          onClick={sureHandler}
          className=" px-8 py-2 bg-blue-500 text-white cursor-pointer 
          rounded-md border-2 hover:bg-transparent hover:border-blue-500
          hover:text-blue-500 "
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SureDeleteModal;

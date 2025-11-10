import { Pencil, Trash2 } from "lucide-react";
import { EventProps } from "../../../../type";

const DetailHeader = ({
  setIsEditing,
  setSureModal,
}: Pick<EventProps, "setIsEditing" | "setSureModal">) => {
  return (
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

      <hr className="my-2 border-2 border-orange-300" />
    </div>
  );
};

export default DetailHeader;

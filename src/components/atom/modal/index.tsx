import { CircleX } from "lucide-react";
import { ModalProps } from "./type";

export default function ModalContainer({
  open,
  handleClose,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-4 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <CircleX className="hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

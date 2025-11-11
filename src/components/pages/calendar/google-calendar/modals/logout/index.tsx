import React from "react";
import { LogoutProps } from "../../type";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";

const LogoutModal = ({ onClose, setAccessToken }: LogoutProps) => {
  const router = useRouter();

  const handelLogout = () => {
    googleLogout();
    setAccessToken(null);
    router.push("/calendar");
    onClose()
  };
  return (
    <div>
      <div className="p-3 flex  justify-center ">
        <h2 className="text-md  mb-4 ">Are you sure to lgout the calendar?</h2>
      </div>

      <div className="flex justify-center mt-4  w-full">
        <button
          type="button"
          onClick={onClose}
          className="mr-4 px-8 py-2 bg-orange-500 text-white 
          cursor-pointer rounded-md border-2 hover:bg-transparent
          hover:border-orange-500 hover:text-orange-500 "
        >
          Cancel
        </button>

        <button
          onClick={handelLogout}
          className=" px-8 py-2 bg-blue-500 text-white cursor-pointer
          rounded-md border-2 hover:bg-transparent hover:border-blue-500
          hover:text-blue-500 "
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;

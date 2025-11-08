import GoogleIcon from "@/components/assets/google-icon";
import { SigninProps } from "../type";

const Signin = ({ login }: SigninProps) => {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <p className="mb-8">Click and signin to your google calendar</p>

      <button
        onClick={() => login()}
        className=" w-[200px]  border-2 border-gray-600 p-2 rounded-full flex cursor-pointer hover:bg-blue-50 hover:border-blue-500"
      >
        <GoogleIcon />
        <p className="ml-2">Sign in with Google</p>
      </button>
    </div>
  );
};

export default Signin;

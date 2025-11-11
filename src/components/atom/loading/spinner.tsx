import { BounceLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <BounceLoader color="#3B82F6" size={50} />
    </div>
  );
};

export default LoadingSpinner;

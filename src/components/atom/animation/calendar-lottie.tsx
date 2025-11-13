import Lottie from "lottie-react";
import calendarAnimation from "@/components/assets/calendar.json";

const CalendarLottie = () => {
  return (
    <Lottie
      animationData={calendarAnimation}
      loop={true}
      className="w-100 h-100"
    />
  );
};

export default CalendarLottie;

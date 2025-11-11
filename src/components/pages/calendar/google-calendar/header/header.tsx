import { CalendarDays, LogOut } from "lucide-react";
import { HeaderProps } from "../type";

export const CalendarHeader = ({ onLogout }: HeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <div></div>
    <div className="flex items-center text-blue-600">
      <h1 className="text-2xl font-semibold  pr-1">Google Calendar</h1>
      <CalendarDays />
    </div>

    <button
      onClick={onLogout}
      className="group flex items-center gap-2
       text-white  transition cursor-pointer 
       border-2 bg-amber-400 p-2 rounded-md
       hover:text-amber-400 hover:border-amber-400
       hover:bg-transparent"
    >
      <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      Sign out
    </button>
  </div>
);

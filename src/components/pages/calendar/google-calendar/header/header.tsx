import { LogOut } from "lucide-react";
import { HeaderProps } from "../type";

export const CalendarHeader = ({ onLogout }: HeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-2xl font-semibold text-blue-600">My Calendar</h1>
    
    <button
      onClick={onLogout}
      className="group flex items-center gap-2 text-red-500 hover:text-red-600 transition cursor-pointer"
    >
      <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      Sign out
    </button>
  </div>
);

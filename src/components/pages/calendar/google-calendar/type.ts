import { OverridableTokenClientConfig } from "@react-oauth/google";
import { Dispatch, SetStateAction } from "react";

export interface CalendarViewProps {
  accessToken: string;
}

export interface SigninProps {
  login: (overrideConfig?: OverridableTokenClientConfig | undefined) => void;
}
export interface HeaderProps {
  onLogout: () => void;
}

export interface calenadrEventBase {
  summary: string;
  description: string;
}
export interface CalendarEvent extends calenadrEventBase {
  id?: string;
  htmlLink?: string;
  hangoutLink?: string;
  creator?: { email?: string };
  start: { dateTime: string  |undefined};
  end: { dateTime: string |undefined};
}

export interface closeProps {
  onClose: () => void;
}

export interface LogoutProps extends closeProps {
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

export interface FormValues extends calenadrEventBase {
  startTime: string;
  endTime: string;
}

export interface EventDetailProps {
  event: CalendarEvent | null;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedEvent: CalendarEvent) => void;
}

export interface CreateEventProps extends closeProps {
  selectedDate: string | null;
  onCreate: (eventData: CalendarEvent) => void;
}

export interface EventProps extends EventDetailProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setSureModal: Dispatch<SetStateAction<boolean>>;
  setEventId: Dispatch<SetStateAction<string>>;
  setNewEvent: Dispatch<SetStateAction<CalendarEvent | null>>;
  sureHandler?: () => void;
  newEvent?: CalendarEvent | null;
}

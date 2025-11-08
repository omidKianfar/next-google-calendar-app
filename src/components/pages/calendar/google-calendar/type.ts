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

export interface LogoutProps {
  onClose: () => void;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
}

export interface CalendarEventInput {
  summary: string;
  description: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

export type FormValues = {
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
};

export interface CalendarEvent {
  id?: string;
  summary: string;
  description: string;
  htmlLink?: string;
  hangoutLink?: string;
  creator?: { email?: string };
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export interface EventDetailProps {
  event: CalendarEvent | null;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, updatedEvent: Partial<CalendarEvent>) => void;
}

export interface CreateEventProps {
  selectedDate: string | null;
  onCreate: (eventData: CalendarEventInput) => void;
  onClose: () => void;
}

export interface SureModalProps {
  sureHandler: () => void;
  setSureModal: Dispatch<SetStateAction<boolean>>;
  newEvent?: CalendarEventInput | null;
}
export interface EventEditProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface CalendarViewProps {
  accessToken: string;
}

export interface HeaderProps {
  onLogout: () => void;
}

export interface EventDetailProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedEvent: Partial<CalendarEvent>) => void;
}

export interface CreateEventProps {
  selectedDate: string | null;
  onCreate: (eventData: CalendarEventInput) => void;
  onClose: () => void;
}

export interface CalendarEvent {
  id?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  hangoutLink?: string;
  creator?: { email?: string };
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
}

export interface CalendarEventInput {
  summary: string;
  description?: string;
  location?: string;
  start: { dateTime: string };
  end: { dateTime: string };
}

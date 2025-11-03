export interface CalendarViewProps {
  accessToken: string;
}

export interface HeaderProps {
  onLogout: () => void;
}

export interface EventDetailProps {
  event: CalendarEvent | null;
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



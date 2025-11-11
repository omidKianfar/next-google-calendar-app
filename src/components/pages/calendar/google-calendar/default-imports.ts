// components default export
export { default as CalendarComponent } from "./google-calendar";
export { default as dayGridPlugin } from "@fullcalendar/daygrid";
export { default as timeGridPlugin } from "@fullcalendar/timegrid";
export { default as interactionPlugin } from "@fullcalendar/interaction";
export { default as ModalContainer } from "@/components/atom/modal";
export { default as Signin } from "./google-calendar/signin";
export { default as LoadingSpinner } from "@/components/atom/loading/spinner";
export { default as GoogleIcon } from "@/components/assets/google-icon";
export { default as EditBody } from "./google-calendar/modals/detail/edit/body";

// components named export
export { useGoogleLogin, googleLogout } from "@react-oauth/google";
export { Suspense, useState } from "react";
export { useGoogleCalendar } from "@/hooks/use-google-calendar";
export { CalendarHeader } from "./google-calendar/header/header";
export { GoogleOAuthProvider } from "@react-oauth/google";
export { useRouter } from "next/navigation";

// type export
export type { DateClickArg } from "@fullcalendar/interaction";
export type { EventClickArg } from "@fullcalendar/core";
export type {
  CalendarEvent,
  LogoutProps,
  SigninProps,
  EventDetailProps,
  EventProps,
} from "./google-calendar/type";



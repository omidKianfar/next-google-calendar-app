import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import GoogleCalendarComponent from "./google-calendar";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

const CalendarComponent = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleCalendarComponent />
    </GoogleOAuthProvider>
  );
};

export default CalendarComponent;

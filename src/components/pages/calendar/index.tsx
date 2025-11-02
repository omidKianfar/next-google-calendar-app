
import { GoogleOAuthProvider } from "@react-oauth/google";
import CalendarComponent from "./google-calendar";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

const GoogleCalendarComponent = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <CalendarComponent />
    </GoogleOAuthProvider>
  );
};

export default GoogleCalendarComponent;

import GoogleCalendarComponent from "@/components/pages/calendar";
import Layout from "../layout";

const CalendarPage: NextPageWithLayout = () => {
  return <GoogleCalendarComponent />;
};

CalendarPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default CalendarPage;

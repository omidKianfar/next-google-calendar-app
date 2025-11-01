import CalendarComponent from "@/components/pages/calendar";
import Layout from "../layout";

const CalendarPage: NextPageWithLayout = () => {
  return <CalendarComponent />;
};

CalendarPage.getLayout = function Home(page) {
  return <Layout>{page}</Layout>;
};

export default CalendarPage;

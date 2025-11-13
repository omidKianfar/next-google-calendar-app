import GoogleIcon from "@/components/assets/google-icon";
import { SigninProps } from "../type";
import CalendarLottie from "@/components/atom/animation/calendar-lottie";

const Signin = ({ login }: SigninProps) => {
  return (
    <main className="flex flex-col min-h-screen justify-between bg-gradient-to-b from-blue-50 to-white relative">
      <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Manage Your Google Calendar
        </h1>

        <p className="text-gray-600 text-lg max-w-xl mb-8">
          Connect your Google Calendar to view, add, and edit events easily —
          stay organized and in control of your schedule.
        </p>

        <button
          onClick={() => login()}
          className="border-2 border-gray-600 p-2 rounded-full flex 
          cursor-pointer hover:bg-blue-50 hover:border-blue-500"
        >
          <GoogleIcon />
          <p className="ml-2">Sign in with Google</p>
        </button>

        <p className="text-gray-400 text-sm mt-4 max-w-sm">
          By signing in, you allow this app to access and manage your Google
          Calendar events.
        </p>

        <div className="absolute right-0 top-0">
          <CalendarLottie />
        </div>
      </section>

      <footer className="bg-gray-100 text-center py-4 text-gray-500 text-sm">
        <p className="pb-2">© {new Date().getFullYear()} My Calendar App</p>

        <p>
          Contact us:{" "}
          <a
            href="mailto:support@mycalendarapp.com"
            className="text-blue-600 hover:underline "
          >
            omid.kianfar.dev@gmail.com
          </a>
        </p>
      </footer>
    </main>
  );
};

export default Signin;

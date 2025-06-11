import Lottie from "lottie-react";
import { Link } from "react-router";
import foodAnimation from "../assets/foodAnimation.json";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 px-4">
      {/* Lottie Animation */}
      <div className="w-64 h-64 mb-2 ">
        <Lottie animationData={foodAnimation} loop={true} />
      </div>

      <p className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-4">
        Oops! Page not found.
      </p>
      <p className="text-center max-w-md text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-emerald-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;

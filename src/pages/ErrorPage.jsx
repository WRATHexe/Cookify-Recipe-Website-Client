import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <h1 className="text-9xl font-extrabold text-slate-800 mb-6">404</h1>
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

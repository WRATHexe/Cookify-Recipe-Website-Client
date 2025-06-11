import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/authContext";

const Login = () => {
  const { login, setUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email.value;
    const password = form.password.value;

    login(emailValue, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const googleLoginHandler = () => {
    googleLogin()
      .then((result) => {
        setUser(result.user);
        toast.success("Google login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Google login failed: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-100 to-orange-100 dark:from-[#1a1a1a] dark:to-[#111] transition-colors duration-300">
      <Helmet>
        <title>Login | COOKIFY</title>
      </Helmet>
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 mb-2 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Login to your Cookify account
          </p>
        </div>

        <form onSubmit={loginHandler} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered w-full bg-orange-50 dark:bg-[#2a2a2a] border border-orange-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full bg-orange-50 dark:bg-[#2a2a2a] border border-orange-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-400 pr-10"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-orange-500"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            <div
              className="text-sm text-orange-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password", { state: { email } })}
            >
              Forgot password?
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-full shadow transition duration-200 text-lg"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          <span className="mx-3 text-gray-400 dark:text-gray-500 font-semibold">
            OR
          </span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
        </div>

        <button
          onClick={googleLoginHandler}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#18191a] border border-orange-200 dark:border-gray-700 text-orange-600 dark:text-orange-300 font-semibold py-2.5 rounded-full shadow hover:bg-orange-50 dark:hover:bg-[#2a2a2a] transition"
        >
          <FaGoogle /> Sign in with Google
        </button>

        <div className="text-center mt-6 text-gray-600 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

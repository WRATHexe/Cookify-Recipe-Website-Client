import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/authContext";

const Register = () => {
  const { createUser, setUser, googleLogin, updateProfileInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateProfileInfo(name, photo);
        toast.success("Registration successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed.");
        console.error(error);
      });
  };

  const googleLoginHandler = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error("Google login failed.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-100 to-orange-100 dark:from-[#1a1a1a] dark:to-[#111] transition-colors duration-300">
      <Helmet>
        <title>Registration | COOKIFY</title>
      </Helmet>
      <div className="w-full max-w-md mx-auto bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 mb-2 tracking-tight">
            Create Your Account
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Join Cookify and start sharing your favorite recipes!
          </p>
        </div>
        <form onSubmit={RegisterHandler} className="space-y-5">
          {["name", "photo", "email"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-1 font-semibold text-gray-700 dark:text-gray-200"
              >
                {field === "photo"
                  ? "Photo URL"
                  : field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                required={field !== "photo"}
                placeholder={field === "photo" ? "Photo URL" : `Your ${field}`}
                className="input input-bordered w-full bg-orange-50 dark:bg-[#2a2a2a] border border-orange-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}
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
                placeholder="Password"
                required
                className="input input-bordered w-full bg-orange-50 dark:bg-[#2a2a2a] border border-orange-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-orange-500"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Must be at least 6 characters, include upper & lower case.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-full shadow transition duration-200 text-lg mt-2"
          >
            Register
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
          <FaGoogle /> Sign up with Google
        </button>

        <div className="text-center mt-6 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            className="font-semibold text-orange-500 hover:underline"
            to={"/login"}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

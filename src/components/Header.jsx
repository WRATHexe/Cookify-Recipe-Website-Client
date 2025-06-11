import { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/authContext";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const logoutHandler = () => {
    logOut()
      .then(() => {
        navigate("/login");
        toast.success("Logout successful");
        setTooltipVisible(false);
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/recipes", label: "All Recipes" },
    { path: "/my-recipes", label: "My Recipes", private: true },
    { path: "/add-recipe", label: "Add Recipe", private: true },
  ];

  return (
    <nav className="bg-[#f3f4f6] dark:bg-[#232526] border-b dark:border-emerald-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-[1800px] mx-auto px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="group text-xl sm:text-3xl font-extrabold tracking-tight text-orange-600 hover:text-emerald-500 dark:text-orange-400 transition-all duration-300 transform hover:scale-105"
        >
          <span className="inline-block group-hover:animate-wiggle">🍴</span>{" "}
          <span className="ml-1">Cookify</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          {navItems
            .filter((item) => !item.private || user)
            .map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-2 sm:px-3 py-1 font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition duration-200 ${
                    isActive
                      ? "text-orange-600 dark:text-orange-400 font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[3px] after:bg-orange-500 dark:after:bg-orange-400 after:rounded-full"
                      : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

          {/* Auth Buttons */}
          <div className="relative ml-2 sm:ml-4 mr-24">
            {user ? (
              <img
                src={
                  user.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="User"
                onClick={() => setTooltipVisible(!isTooltipVisible)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring ring-emerald-500 ring-offset-2 cursor-pointer hover:scale-105 transition"
              />
            ) : (
              <FaUserCircle
                size={40}
                className="text-orange-400 cursor-pointer hover:text-orange-600 transition"
                onClick={() => setTooltipVisible(!isTooltipVisible)}
              />
            )}
            {isTooltipVisible && (
              <div className="absolute right-0 mt-3 w-56 p-4 bg-white dark:bg-[#2d2d2d] text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 shadow-xl rounded-xl z-50 animate-fadeIn">
                {user ? (
                  <>
                    <p className="font-semibold text-center mb-3">
                      {user.displayName}
                    </p>
                    <div className="flex flex-col gap-2">
                      {navItems
                        .filter((item) => !item.private || user)
                        .map(({ path, label }) => (
                          <NavLink
                            key={path}
                            to={path}
                            onClick={() => setTooltipVisible(false)}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition duration-200 ${
                                isActive
                                  ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-semibold"
                                  : ""
                              }`
                            }
                          >
                            {label}
                          </NavLink>
                        ))}
                      <button
                        onClick={logoutHandler}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium w-full transition mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <NavLink
                      to="/login"
                      onClick={() => setTooltipVisible(false)}
                      className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-emerald-700 transition"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setTooltipVisible(false)}
                      className="border-2 border-cyan-600 text-cyan-600 px-5 py-2 rounded-full font-semibold hover:bg-cyan-600 hover:text-white transition"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
                <div className="absolute top-0 right-4 -mt-2 w-4 h-4 rotate-45 bg-white dark:bg-[#2d2d2d] border-t border-l border-gray-200 dark:border-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Only show avatar/icon, open tooltip on click */}
        <div className="flex md:hidden items-center">
          <div className="relative">
            {user ? (
              <img
                src={
                  user.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="User"
                onClick={() => setTooltipVisible(!isTooltipVisible)}
                className="w-9 h-9 rounded-full ring ring-emerald-500 ring-offset-2 cursor-pointer hover:scale-105 transition"
              />
            ) : (
              <FaUserCircle
                size={36}
                className="text-orange-400 cursor-pointer hover:text-orange-600 transition"
                onClick={() => setTooltipVisible(!isTooltipVisible)}
              />
            )}
            {isTooltipVisible && (
              <div className="absolute right-0 mt-3 w-56 p-4 bg-white dark:bg-[#2d2d2d] text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 shadow-xl rounded-xl z-50 animate-fadeIn">
                {/* Always show Home and All Recipes */}
                <NavLink
                  to="/"
                  onClick={() => setTooltipVisible(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition duration-200 ${
                      isActive
                        ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-semibold"
                        : ""
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/recipes"
                  onClick={() => setTooltipVisible(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition duration-200 ${
                      isActive
                        ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-semibold"
                        : ""
                    }`
                  }
                >
                  All Recipes
                </NavLink>
                {user ? (
                  <>
                    {/* Private links for logged in user */}
                    {navItems
                      .filter((item) => item.private)
                      .map(({ path, label }) => (
                        <NavLink
                          key={path}
                          to={path}
                          onClick={() => setTooltipVisible(false)}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900 hover:text-orange-600 dark:hover:text-orange-400 transition duration-200 ${
                              isActive
                                ? "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 font-semibold"
                                : ""
                            }`
                          }
                        >
                          {label}
                        </NavLink>
                      ))}
                    <button
                      onClick={logoutHandler}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-medium w-full transition mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 mt-2">
                    <NavLink
                      to="/login"
                      onClick={() => setTooltipVisible(false)}
                      className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-emerald-700 transition"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setTooltipVisible(false)}
                      className="border-2 border-cyan-600 text-cyan-600 px-5 py-2 rounded-full font-semibold hover:bg-cyan-600 hover:text-white transition"
                    >
                      Register
                    </NavLink>
                  </div>
                )}
                <div className="absolute top-0 right-4 -mt-2 w-4 h-4 rotate-45 bg-white dark:bg-[#2d2d2d] border-t border-l border-gray-200 dark:border-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

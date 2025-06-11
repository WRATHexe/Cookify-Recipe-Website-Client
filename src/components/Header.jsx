import { useContext, useState } from "react";
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
        setTooltipVisible(false); // Hide tooltip when logging out
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  // Toggle Tooltip visibility on avatar click
  const toggleTooltip = () => {
    setTooltipVisible((prev) => !prev);
  };

  return (
    <nav className="navbar bg-white shadow border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-extrabold text-slate-800 tracking-wide hover:text-emerald-600 transition"
        >
          COOKIFY
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8 mr-12">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-700 hover:text-emerald-600 font-medium transition ${
              isActive ? "underline" : ""
            }`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `text-gray-700 hover:text-emerald-600 font-medium transition ${
              isActive ? "underline" : ""
            }`
          }
        >
          All Recipes
        </NavLink>
        {user && (
          <NavLink
            to="/my-recipes"
            className={({ isActive }) =>
              `text-gray-700 hover:text-emerald-600 font-medium transition ${
                isActive ? "underline" : ""
              }`
            }
          >
            My Recipes
          </NavLink>
        )}
        {user && (
          <NavLink
            to="/add-recipe"
            className={({ isActive }) =>
              `text-gray-700 hover:text-emerald-600 font-medium transition ${
                isActive ? "underline" : ""
              }`
            }
          >
            Add Recipe
          </NavLink>
        )}

        {!user ? (
          <div className="flex gap-4">
            <NavLink
              to="/login"
              className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-emerald-700 transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="bg-transparent text-emerald-600 border-2 border-emerald-600 px-5 py-2 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition"
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-5 ml-8 relative">
            <div className="avatar cursor-pointer" onClick={toggleTooltip}>
              <div className="w-10 rounded-full ring ring-emerald-500 ring-offset-2">
                <img
                  alt="user"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  className="w-9 h-9 rounded-full hover:shadow-lg transition-transform"
                  title={user?.displayName || "User"}
                />
              </div>
            </div>

            {/* Conditionally Render Tooltip */}
            {isTooltipVisible && (
              <div className="absolute top-full mt-2 p-4 bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-lg border border-gray-300 rounded-xl w-52 text-center text-white transform transition-all duration-300 ease-in-out opacity-100">
                <div className="text-xl font-semibold mb-3">
                  {user.displayName}
                </div>
                <button
                  onClick={logoutHandler}
                  className="bg-white text-emerald-600 px-4 py-2 rounded-full font-semibold shadow hover:bg-emerald-100 transition"
                >
                  Logout
                </button>
                {/* Arrow */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-700 rotate-45 border-t border-l border-gray-300"></div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center gap-2">
        {user && (
          <div className="avatar">
            <div className="w-9 rounded-full ring ring-emerald-500 ring-offset-2">
              <img
                alt="user"
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                className="w-9 h-9 rounded-full hover:shadow-lg transition-transform"
                title={user?.displayName || "User"}
              />
            </div>
          </div>
        )}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              className="w-7 h-7 text-slate-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white border border-gray-200 rounded-box w-52"
          >
            <li>
              <NavLink to="/" className="text-slate-700 hover:text-emerald-600">
                Home
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/recipes"
                  className="text-slate-700 hover:text-emerald-600"
                >
                  Recipes
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  to="/my-recipes"
                  className="text-slate-700 hover:text-emerald-600"
                >
                  My Recipes
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  to="/add-recipe"
                  className="text-slate-700 hover:text-emerald-600"
                >
                  Add Recipe
                </NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink
                  to="/login"
                  className="text-slate-700 hover:text-emerald-600"
                >
                  Login
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={logoutHandler}
                  className="text-slate-700 hover:text-emerald-600 w-full text-left"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import { Link, NavLink } from "react-router";

const Header = () => {
  return (
    <nav className="navbar bg-white shadow px-4 py-3">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-extrabold text-slate-800 tracking-wide hover:text-emerald-600 transition"
        >
          RecipeBook
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-700 hover:text-emerald-600 font-medium transition ${
              isActive ? "underline" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-gray-700 hover:text-emerald-600 font-medium transition ${
              isActive ? "underline" : ""
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/login"
          className="bg-emerald-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-emerald-700 transition"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;

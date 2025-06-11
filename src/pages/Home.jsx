import { useEffect, useState } from "react";
import TopRecipes from "../components/TopRecipes";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if the user has a saved theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle theme between dark and light
  const handleThemeToggle = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } transition-colors duration-300`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Welcome to the Recipe Book</h1>
        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className="bg-indigo-600 text-white p-2 rounded-full"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Top Recipes Section */}
      <TopRecipes isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;

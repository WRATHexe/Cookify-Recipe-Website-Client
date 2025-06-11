import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import ShareRecipe from "../components/ShareRecipe";
import TipsSection from "../components/TipsSection";
import TopRecipes from "../components/TopRecipes";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-[#fffaf0] text-gray-900"
      }`}
    >
      {/* Sticky Theme Toggle Button */}
      <div className="fixed top-2 sm:top-3 right-15 sm:right-15 md:right-15 z-50">
        <button
          onClick={handleThemeToggle}
          className="flex items-center gap-2 px-3 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition duration-300 shadow-lg"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Hero Section */}
      <Hero isDarkMode={isDarkMode} />

      {/* 🔥 Food-themed Banner Section */}
      <Banner />

      {/* 🍽️ Top Recipes Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 border-b-4 border-orange-400 inline-block pb-1">
          🍽️ Top Recipes
        </h2>
        <TopRecipes isDarkMode={isDarkMode} />
      </section>

      {/* 📝 Tips & Tricks Section */}
      <TipsSection />
      {/* 🍳 Share Recipe Section */}
      <ShareRecipe isDarkMode={isDarkMode} />
    </div>
  );
};

export default Home;

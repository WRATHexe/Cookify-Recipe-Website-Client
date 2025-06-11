import Lottie from "lottie-react";
import burgerAnimation from "../assets/Burger.json";

const Hero = ({ isDarkMode }) => {
  return (
    <section
      className={`shadow-md ${
        isDarkMode
          ? "bg-gradient-to-r from-[#232526] to-[#1e1e1e] text-white"
          : "bg-gradient-to-r from-orange-50 via-orange-100 to-amber-100"
      }`}
    >
      <div className="max-w-5/6 mx-auto px-4 py-16 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Discover & Share <span className="text-orange-600">Delicious</span>{" "}
            <span className="text-amber-500">Recipes</span>
          </h1>
          <p
            className={`text-lg mb-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your personal recipe book to explore, create, and enjoy. Find
            inspiration, save your favorites, and join a community of food
            lovers.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("top-recipes");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-full shadow transition duration-200 text-lg"
          >
            Explore Top Recipes
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <Lottie
            animationData={burgerAnimation}
            loop
            className="w-full max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

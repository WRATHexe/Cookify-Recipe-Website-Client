const ShareRecipeSection = ({ isDarkMode }) => (
  <section
    className={`relative py-16 px-4 ${
      isDarkMode
        ? "bg-gradient-to-r from-[#232526] to-[#1e1e1e] text-white"
        : "bg-gradient-to-r from-orange-50 to-amber-200"
    } overflow-hidden transition-colors duration-300`}
  >
    {/* Decorative background shape (optional) */}
    <div
      className={`absolute inset-0 opacity-10 bg-[] ${
        isDarkMode ? "dark:opacity-10" : "dark:opacity-5"
      } bg-repeat`}
    ></div>
    <div className="relative max-w-4xl mx-auto text-center z-10">
      <h3 className="text-3xl md:text-4xl font-extrabold text-orange-600 dark:text-orange-400 mb-4">
        🍳 Got a Secret Recipe?
      </h3>
      <p
        className={`text-lg mb-6 px-2 md:px-10 ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        Join our food lover’s hub and inspire taste buds with your delicious
        creations. Let the world taste what you’ve mastered!
      </p>

      <a
        href="/add-recipe"
        className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
      >
        🍲 Add Your Recipe
      </a>
    </div>
  </section>
);

export default ShareRecipeSection;

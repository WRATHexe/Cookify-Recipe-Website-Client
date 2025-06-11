import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TopRecipes = ({ isDarkMode }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://wrath-cookify-server.vercel.app/recipes/top")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2
        className={`text-3xl font-extrabold text-center mb-10 tracking-tight drop-shadow ${
          isDarkMode ? "text-gray-100" : "text-orange-500"
        }`}
      >
        🍲 Top Recipes of the Week
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className={`rounded-3xl overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 ${
              isDarkMode
                ? "bg-gradient-to-br from-[#1c1c1c] via-[#232323] to-[#1a1a1a] text-gray-100"
                : "bg-gradient-to-br from-white via-orange-50 to-orange-100 text-gray-900"
            } group relative`}
            style={{ minHeight: 420 }}
          >
            <div className="relative">
              <img
                src={recipe.photo}
                alt={recipe.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
                style={{
                  borderBottom: isDarkMode
                    ? "2px solid #333"
                    : "2px solid #ffd6b0",
                }}
              />

              <div className="absolute top-4 right-4 bg-gray-700/80 text-gray-200 text-xs px-3 py-1 rounded-full shadow font-medium">
                ⏱ {recipe.prepTime || "30 min"}
              </div>

              <div className="absolute top-4 left-4 bg-gray-700/80 text-gray-200 text-xs px-3 py-1 rounded-full shadow font-medium">
                ❤️ {recipe.likeCount || 0}
              </div>
            </div>

            <div className="p-7 flex flex-col h-64">
              <h3 className="text-xl font-bold mb-2 line-clamp-2 drop-shadow">
                {recipe.title}
              </h3>
              <p className="text-sm mb-1">
                <span className="font-medium text-gray-400">Cuisine:</span>{" "}
                {recipe.cuisineType}
              </p>
              <p className="text-sm mb-3">
                <span className="font-medium text-gray-400">Prep Time:</span>{" "}
                {recipe.prepTime || "30 min"}
              </p>
              <div className="mt-auto flex justify-end">
                <button
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <button
          onClick={() => navigate("/recipes")}
          className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all duration-200 tracking-wide text-lg ${
            isDarkMode
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-orange-100 hover:bg-orange-200 text-orange-700"
          }`}
        >
          See All Recipes
        </button>
      </div>
    </section>
  );
};

export default TopRecipes;

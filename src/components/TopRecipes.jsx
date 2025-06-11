import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Backend should use sort and limit to return top 6 recipes by likeCount
    fetch("http://localhost:4000/recipes/top")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={
                recipe.photo ||
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
            <p className="text-gray-500 text-sm mb-1">
              <strong>Cuisine:</strong> {recipe.cuisineType}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Likes:</strong> {recipe.likeCount || 0}
            </p>
            <button
              className="btn bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
              onClick={() => navigate(`/recipes/${recipe._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="btn bg-gray-200 text-gray-700 px-6 py-3 rounded-xl shadow hover:bg-gray-300 transition"
          onClick={() => navigate("/recipes")}
        >
          See All Recipes
        </button>
      </div>
    </div>
  );
};

export default TopRecipes;

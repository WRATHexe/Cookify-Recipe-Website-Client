import { useEffect, useState } from "react";
import { useParams } from "react-router"; // FIXED

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/recipes/${id}`);
        if (!response.ok) {
          setRecipe(null);
        } else {
          const data = await response.json();
          setRecipe(data);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          {/* Recipe Image */}
          <img
            src={
              recipe.recipePhoto ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={recipe.recipeTitle}
            className="w-full h-64 object-cover rounded-xl"
          />

          {/* Recipe Title */}
          <h2 className="text-3xl font-bold text-gray-800">
            {recipe.recipeTitle}
          </h2>

          {/* Ingredients */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Ingredients</h3>
            <p className="text-gray-600">{recipe.ingredients}</p>
          </div>

          {/* Cooking Instructions */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Cooking Instructions
            </h3>
            <p className="text-gray-600">{recipe.instructions}</p>
          </div>

          {/* Cuisine Type & Prep Time */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Preparation Time:</strong> {recipe.prepTime} minutes
            </p>
          </div>

          {/* Likes */}
          <div className="flex items-center space-x-4">
            <button className="btn bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-700">
              Like
            </button>
            <p className="text-sm text-gray-500">
              Liked by {recipe.likes} people
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

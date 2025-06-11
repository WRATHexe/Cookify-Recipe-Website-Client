import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/authContext";

const RecipeDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipe (used for both initial load and polling)
  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:4000/recipes/${id}`);
      if (!response.ok) {
        setRecipe(null);
      } else {
        const data = await response.json();
        setRecipe(data);
      }
    } catch {
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRecipe();

    // Poll every 5 seconds for updates
    const interval = setInterval(fetchRecipe, 3000);

    return () => clearInterval(interval);
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

  const handleLike = async () => {
    if (user.email === recipe.createdBy) {
      Swal.fire({
        title: "You cannot like your own recipe!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const response = await fetch(
      `http://localhost:4000/recipes/${recipe._id}/like`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setRecipe((prev) => ({
        ...prev,
        likeCount: data.likeCount,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          {/* Recipe Image */}
          <img
            src={
              recipe.photo ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-xl"
          />

          {/* Recipe Title */}
          <h2 className="text-3xl font-bold text-gray-800">{recipe.title}</h2>

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
              <strong>Cuisine:</strong> {recipe.cuisineType}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Preparation Time:</strong> {recipe.prepTime} minutes
            </p>
          </div>

          {/* Likes */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="btn bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-700"
            >
              Like
            </button>
            <p className="text-sm text-gray-500">
              Liked by {recipe.likeCount} people
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

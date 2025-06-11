import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/authContext";

const RecipeDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:4000/recipes/${id}`);
        if (!res.ok) {
          setRecipe(null);
        } else {
          const data = await res.json();
          setRecipe(data);
        }
      } catch {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchRecipe();
    const interval = setInterval(fetchRecipe, 3000);
    return () => clearInterval(interval);
  }, [id]);

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
      { method: "PATCH", headers: { "Content-Type": "application/json" } }
    );

    if (response.ok) {
      const data = await response.json();
      setRecipe((prev) => ({ ...prev, likeCount: data.likeCount }));
      toast.success(`You liked "${recipe.title}"`, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600 font-medium">Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 py-12 px-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto">
        {/* Like Count at the Top */}
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-semibold shadow text-lg">
            {recipe.likeCount} people interested in this recipe
          </span>
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          {/* Recipe Image */}
          <img
            src={
              recipe.photo ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-2xl border border-orange-100"
          />

          {/* Title */}
          <h2 className="text-4xl font-bold text-orange-600">{recipe.title}</h2>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Cuisine:</span>{" "}
              {recipe.cuisineType}
            </p>
            <p>
              <span className="font-semibold">Prep Time:</span>{" "}
              {recipe.prepTime} mins
            </p>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🥕 Ingredients
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {recipe.ingredients}
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              🍳 Cooking Instructions
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {recipe.instructions}
            </p>
          </div>

          {/* Like Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-7 py-3 text-lg font-bold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-orange-500 hover:to-pink-500 text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Like this recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

import { Link } from "react-router";

const RecipeCard = (recipe) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <img
        src={recipe.photoUrl}
        alt={recipe.recipeTitle}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h3 className="text-xl font-semibold">{recipe.recipeTitle}</h3>
      <p className="text-sm text-gray-600">Cuisine: {recipe.CuisineType}</p>
      <p className="text-sm text-gray-600">Prep Time: {recipe.prepTime} mins</p>
      <Link
        to={`/recipe/${recipe.id}`} // Redirects to Recipe Details Page
        className="text-indigo-600 hover:text-indigo-800 font-semibold"
      >
        See Details
      </Link>
    </div>
  );
};

export default RecipeCard;

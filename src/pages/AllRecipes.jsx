import { useLoaderData } from "react-router";
import RecipeCard from "../components/RecipeCard";

const AllRecipes = () => {
  const recipes = useLoaderData();
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          All Recipes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;

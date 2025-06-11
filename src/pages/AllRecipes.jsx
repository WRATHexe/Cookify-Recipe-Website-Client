import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import RecipeCard from "../components/RecipeCard";

const AllRecipes = () => {
  const recipes = useLoaderData();
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  // Dynamically get unique cuisine types from recipes
  const cuisineTypes = useMemo(() => {
    const types = recipes.map((r) => r.cuisineType).filter(Boolean);
    return ["All", ...Array.from(new Set(types))];
  }, [recipes]);

  // Filter recipes by selected cuisine type
  const filteredRecipes =
    selectedCuisine === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.cuisineType === selectedCuisine);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          All Recipes
        </h2>

        {/* Cuisine Type Filter Dropdown */}
        <div className="flex justify-end mb-6">
          <select
            className="p-3 border border-gray-300 rounded-lg shadow focus:ring-2 focus:ring-indigo-500"
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
          >
            {cuisineTypes.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All Cuisines" : type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRecipes;

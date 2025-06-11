import { useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import RecipeCard from "../components/RecipeCard";

const AllRecipes = () => {
  const recipes = useLoaderData();
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const cuisineTypes = useMemo(() => {
    const types = recipes.map((r) => r.cuisineType).filter(Boolean);
    return ["All", ...Array.from(new Set(types))];
  }, [recipes]);

  const filteredRecipes =
    selectedCuisine === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.cuisineType === selectedCuisine);

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-rose-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10">
          🧾 Browse All Recipes
        </h2>

        {/* Filter Dropdown */}
        <div className="flex justify-end mb-8">
          <select
            className="px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700"
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

        {/* Grid of Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 italic">
              No recipes found for selected cuisine.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllRecipes;

import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const CUISINE_OPTIONS = [
  "Italian",
  "Mexican",
  "Indian",
  "Bangladeshi",
  "Chinese",
  "France",
  "Others",
];

const UpdateRecipe = () => {
  const { id } = useParams();
  const recipe = useLoaderData(`http://localhost:4000/recipes/${id}`);
  const navigate = useNavigate();

  const {
    photo = "",
    title = "",
    ingredients = "",
    instructions = "",
    cuisineType = "",
    prepTime = "",
    category = [],
  } = recipe || {};

  const [cuisine, setCuisine] = useState(cuisineType);
  const [categories, setCategories] = useState(category);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedRecipe = Object.fromEntries(form.entries());
    updatedRecipe.cuisineType = cuisine;
    updatedRecipe.category = categories;

    fetch(`http://localhost:4000/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Recipe Updated Successfully!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
          navigate(`/my-recipes`);
        }
      })
      .catch((error) => {
        console.error("Error updating recipe:", error);
        alert("Failed to update recipe. Please try again.");
      });
  };

  if (!recipe) {
    return <div className="text-center text-red-500">Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white/95 backdrop-blur p-10 rounded-3xl shadow-2xl border border-orange-200 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-extrabold text-orange-600 flex items-center gap-2">
            <span className="pl-4 pr-2 py-2">Update Recipe</span>
            <span role="img" aria-label="plate" className="text-3xl">
              🍽️
            </span>
          </h2>
          <button
            type="button"
            onClick={() => navigate("/my-recipes")}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 text-orange-700 font-semibold shadow hover:bg-orange-200 hover:text-orange-900 transition-all duration-200 border border-orange-200"
          >
            Back
          </button>
        </div>

        <form className="space-y-8" onSubmit={handleUpdate}>
          {/* Recipe Photo URL Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Recipe Photo URL
            </label>
            <input
              type="text"
              name="photo"
              defaultValue={photo}
              placeholder="Enter the recipe photo URL"
              className="input w-full p-4 border-2 border-orange-200 rounded-2xl shadow focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-50/50"
            />
          </div>

          {/* Recipe Title Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Recipe Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              name="title"
              defaultValue={title}
              placeholder="Enter the recipe name"
              className="input w-full p-4 border-2 border-orange-200 rounded-2xl shadow focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-50/50"
            />
          </div>

          {/* Ingredients Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Ingredients <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              placeholder="List ingredients here"
              name="ingredients"
              defaultValue={ingredients}
              className="textarea w-full p-4 border-2 border-orange-200 rounded-2xl shadow focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-50/50"
              rows="4"
            ></textarea>
          </div>

          {/* Instructions Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Cooking Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              placeholder="Step-by-step instructions"
              name="instructions"
              defaultValue={instructions}
              className="textarea w-full p-4 border-2 border-orange-200 rounded-2xl shadow focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-50/50"
              rows="4"
            ></textarea>
          </div>

          {/* Cuisine Type Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Cuisine Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="cuisineType"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Enter or select cuisine type"
              list="cuisine-options"
              className="w-full p-4 border-2 border-orange-200 rounded-2xl shadow focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-50/50"
              required
            />
            <datalist id="cuisine-options">
              {CUISINE_OPTIONS.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </div>

          {/* Preparation Time Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Preparation Time (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              name="prepTime"
              min="1"
              defaultValue={prepTime}
              placeholder="Enter prep time"
              className="input w-full p-4 border-2 border-orange-200 rounded-2xl shadow focus:ring-2 focus:ring-orange-400 transition-all duration-300 bg-orange-50/50"
            />
          </div>

          {/* Categories Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700 mb-2 block">
              Categories
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                (cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl shadow-sm hover:bg-orange-100 transition cursor-pointer border border-orange-100"
                  >
                    <input
                      type="checkbox"
                      value={cat}
                      checked={categories.includes(cat)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...categories, cat]
                          : categories.filter((c) => c !== cat);
                        setCategories(newCategories);
                      }}
                      className="checkbox checkbox-warning"
                    />
                    <span className="text-md">{cat}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 rounded-2xl shadow-lg bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 text-white text-lg font-bold hover:from-orange-600 hover:to-yellow-500 hover:scale-105 transition-all duration-300 tracking-wide"
            >
              <span className="inline-block mr-2">💾</span>
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;

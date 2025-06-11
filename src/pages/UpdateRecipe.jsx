import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateRecipe = () => {
  // Get the recipe data from the loader
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
            timer: 2000,
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
  // Render the update form
  if (!recipe) {
    return <div className="text-center text-red-500">Recipe not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Update Recipe 🍽️</h2>
          <button
            type="button"
            onClick={() => navigate("/my-recipes")}
            className="btn bg-gray-200 text-gray-700 px-4 py-2 rounded-xl shadow hover:bg-gray-300 transition-all duration-200"
          >
            Back
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleUpdate}>
          {/* Recipe Photo URL Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Recipe Photo URL
            </label>
            <input
              type="text"
              name="photo"
              defaultValue={photo}
              placeholder="Enter the recipe photo URL"
              className="input w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Recipe Title Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Recipe Title
            </label>
            <input
              required
              type="text"
              name="title"
              defaultValue={title}
              placeholder="Enter the recipe name"
              className="input w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Ingredients Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Ingredients
            </label>
            <textarea
              required
              placeholder="List ingredients here"
              name="ingredients"
              defaultValue={ingredients}
              className="textarea w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              rows="4"
            ></textarea>
          </div>

          {/* Instructions Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Cooking Instructions
            </label>
            <textarea
              required
              placeholder="Step-by-step instructions"
              name="instructions"
              defaultValue={instructions}
              className="textarea w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              rows="4"
            ></textarea>
          </div>

          {/* Cuisine Type Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Cuisine Type
            </label>
            <select
              name="cuisineType"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            >
              <option value="">Select Cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Preparation Time Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Preparation Time (minutes)
            </label>
            <input
              required
              type="number"
              name="prepTime"
              min="1"
              defaultValue={prepTime}
              placeholder="Enter prep time"
              className="input w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Categories Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Categories
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                (cat) => (
                  <label key={cat} className="flex items-center gap-2">
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
                      className="checkbox checkbox-primary"
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
              className="btn bg-indigo-600 text-white w-full py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out text-lg font-semibold"
            >
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;

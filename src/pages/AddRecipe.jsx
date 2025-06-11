import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/authContext";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const [cuisineType, setCuisineType] = useState("");
  console.log(user);
  const handleAddCoffee = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const newRecipe = Object.fromEntries(formData.entries());
    newRecipe.createdBy = user?.email || "Anonymous";

    fetch("http://localhost:4000/Recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Recipe Added Successfully!",
            icon: "success",
            draggable: true,
          });
          //form.reset();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add a New Recipe 🍽️
        </h2>

        <form className="space-y-6" onSubmit={handleAddCoffee}>
          {/* Image Upload Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">
              Recipe Photo URL
            </label>
            <input
              type="text"
              name="photo"
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
              className="textarea w-full p-4 border-2 border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="text-lg font-semibold text-gray-700">
              Cuisine Type
            </label>
            <select
              name="cuisineType"
              value={cuisineType}
              onChange={(e) => {
                setCuisineType(e.target.value);
              }}
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
                      name="category"
                      value={cat}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span className="text-md">{cat}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Likes (Read-Only) Section */}
          <div>
            <label className="text-lg font-semibold text-gray-700">Likes</label>
            <input
              type="number"
              name="likeCount"
              value="0"
              readOnly
              className="input w-full p-4 bg-gray-100 text-gray-500 cursor-not-allowed border-2 border-gray-300 rounded-xl shadow-md"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn bg-indigo-600 text-white w-full py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out text-lg font-semibold"
            >
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

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
    newRecipe.likeCount = "0";
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
            timer: 1000,
            showConfirmButton: false,
          });
          //form.reset();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-orange-200">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10 drop-shadow">
          Add a New Recipe{" "}
          <span role="img" aria-label="plate">
            🍽️
          </span>
        </h2>

        <form className="space-y-10" onSubmit={handleAddCoffee}>
          {/* Recipe Info */}
          <section>
            <h3 className="text-xl font-bold text-amber-600 mb-4">
              Recipe Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Recipe photo URL"
                  className="input w-full p-3 border-2 border-orange-200 rounded-xl shadow focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  placeholder="Recipe name"
                  className="input w-full p-3 border-2 border-orange-200 rounded-xl shadow focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>
            </div>
          </section>

          {/* Ingredients & Instructions */}
          <section>
            <h3 className="text-xl font-bold text-amber-600 mb-4">
              Ingredients & Instructions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  Ingredients <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="List ingredients here"
                  name="ingredients"
                  className="textarea w-full p-3 border-2 border-orange-200 rounded-xl shadow focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  Cooking Instructions <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  placeholder="Step-by-step instructions"
                  name="instructions"
                  className="textarea w-full p-3 border-2 border-orange-200 rounded-xl shadow focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Details */}
          <section>
            <h3 className="text-xl font-bold text-amber-600 mb-4">Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  Cuisine Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cuisineType"
                  value={cuisineType}
                  onChange={(e) => setCuisineType(e.target.value)}
                  placeholder="Enter or select cuisine type"
                  list="cuisine-options"
                  className="w-full p-3 border-2 border-orange-200 rounded-xl shadow focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  required
                />
                <datalist id="cuisine-options">
                  <option value="Italian" />
                  <option value="Mexican" />
                  <option value="Indian" />
                  <option value="Bangladeshi" />
                  <option value="Chinese" />
                  <option value="France" />
                  <option value="Others" />
                </datalist>
              </div>
              <div>
                <label className="block text-base font-semibold text-gray-700 mb-1">
                  Preparation Time (minutes){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  name="prepTime"
                  min="1"
                  placeholder="Enter prep time"
                  className="input w-full p-3 border-2 border-orange-200 rounded-xl shadow focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section>
            <h3 className="text-xl font-bold text-amber-600 mb-4">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
              {[
                "Breakfast",
                "Lunch",
                "Dinner",
                "Dessert",
                "Vegan",
                "Appetizer",
                "Brunch",
              ].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg shadow-sm hover:bg-orange-100 transition cursor-pointer"
                >
                  <input
                    name="category"
                    value={cat}
                    type="checkbox"
                    className="checkbox checkbox-warning"
                  />
                  <span className="text-md">{cat}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 rounded-xl shadow-lg bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 text-white text-lg font-bold hover:from-orange-600 hover:to-yellow-500 hover:scale-105 transition-all duration-300"
            >
              <span role="img" aria-label="add">
                ➕
              </span>{" "}
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;

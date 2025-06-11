import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
const CATEGORY_OPTIONS = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

const UpdateRecipeModal = ({ isOpen, onClose, id }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cuisine, setCuisine] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || !id) return;
    setLoading(true);
    fetch(`https://wrath-cookify-server.vercel.app/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setCuisine(data?.cuisineType || "");
        setCategories(data?.category || []);
      })
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false));
  }, [isOpen, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updatedData = Object.fromEntries(form.entries());
    updatedData.cuisineType = cuisine;
    updatedData.category = categories;

    try {
      const res = await fetch(
        `https://wrath-cookify-server.vercel.app/recipes/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        onClose();
        navigate("/my-recipes");
      }
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire("Error", "Failed to update recipe.", "error");
    }
  };

  if (!isOpen) return null;

  const baseInputStyle =
    "w-full p-4 border-2 border-orange-200 rounded-2xl shadow bg-orange-50/50 focus:ring-2 focus:ring-orange-400 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#232526] p-8 md:p-10 rounded-3xl shadow-xl border border-orange-200 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-orange-500"
        >
          &times;
        </button>

        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-orange-600 flex items-center gap-2">
            🍽️ Update Recipe
          </h2>

        </header>

        {loading ? (
          <div className="text-center text-orange-500 text-lg">Loading...</div>
        ) : recipe ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Recipe Photo URL
              </label>
              <input
                name="photo"
                defaultValue={recipe.photo}
                className={baseInputStyle}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                defaultValue={recipe.title}
                required
                className={baseInputStyle}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Ingredients <span className="text-red-500">*</span>
              </label>
              <textarea
                name="ingredients"
                defaultValue={recipe.ingredients}
                required
                rows="3"
                className={baseInputStyle}
              ></textarea>
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Instructions <span className="text-red-500">*</span>
              </label>
              <textarea
                name="instructions"
                defaultValue={recipe.instructions}
                required
                rows="3"
                className={baseInputStyle}
              ></textarea>
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Cuisine Type <span className="text-red-500">*</span>
              </label>
              <input
                list="cuisine-types"
                name="cuisineType"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                required
                className={baseInputStyle}
              />
              <datalist id="cuisine-types">
                {CUISINE_OPTIONS.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Prep Time (in minutes)
              </label>
              <input
                type="number"
                name="prepTime"
                defaultValue={recipe.prepTime}
                min="1"
                className={baseInputStyle}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-1">
                Categories
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORY_OPTIONS.map((cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={categories.includes(cat)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...categories, cat]
                          : categories.filter((c) => c !== cat);
                        setCategories(updated);
                      }}
                      className="checkbox checkbox-warning"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-white font-bold bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 rounded-2xl hover:from-orange-600 hover:to-yellow-500 hover:scale-105 transition"
            >
              💾 Save Changes
            </button>
          </form>
        ) : (
          <div className="text-center text-red-500 text-lg">
            Recipe not found.
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRecipeModal;

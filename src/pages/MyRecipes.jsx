import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/authContext";
import UpdateRecipeModal from "./UpdateRecipeModal";

const POLL_INTERVAL = 100;

const MyRecipes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const pollingRef = useRef();

  // Fetch recipes function
  const fetchMyRecipes = async () => {
    try {
      const res = await fetch(
        `https://wrath-cookify-server.vercel.app/recipes/user/${user.email}`
      );
      const data = await res.json();
      setMyRecipes(data);
    } catch (err) {
      console.error("Error fetching user recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true); // Ensure loading state is set on user or modalOpen change
    fetchMyRecipes();
    if (modalOpen) {
      pollingRef.current = setInterval(fetchMyRecipes, POLL_INTERVAL);
    }
    return () => {
      clearInterval(pollingRef.current);
    };
  }, [user, modalOpen]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This recipe will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#eab308",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#fffaf0",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://wrath-cookify-server.vercel.app/recipes/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            setMyRecipes((prev) => prev.filter((r) => r._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your recipe has been deleted.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
              background: "#fffaf0",
            });
          } else {
            Swal.fire("Failed!", "Failed to delete recipe.", "error");
          }
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire("Error!", "Delete error occurred.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10 flex items-center justify-center gap-2 drop-shadow">
          <span className="inline-block px-4 py-2 rounded-2xl">
            <span className="font-bold">🍳 My Recipes</span>
          </span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
          </div>
        ) : myRecipes.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-md border border-orange-200">
            <p className="text-gray-700 text-lg">
              🍽️ You haven’t added any recipes yet.
              <br />
              Start sharing your creations today!
            </p>
            <button
              onClick={() => navigate("/add-recipe")}
              className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Add Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white border border-orange-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group cursor-pointer"
                onClick={() => navigate(`/recipes/${recipe._id}`)}
              >
                {/* Recipe Image */}
                <img
                  src={
                    recipe.photo ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Recipe Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Cuisine:</span>{" "}
                    {recipe.cuisineType}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Prep Time:</span>{" "}
                    {recipe.prepTime} mins
                  </p>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex justify-between items-center px-5 py-4 border-t border-orange-100 bg-orange-50 gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setSelectedId(recipe._id);
                      setModalOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0V21h8"
                      ></path>
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow hover:from-pink-600 hover:to-red-600 hover:scale-105 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <UpdateRecipeModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          id={selectedId}
        />
      )}
    </div>
  );
};

export default MyRecipes;

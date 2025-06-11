import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Assuming you have an AuthContext to get user data
import RecipeCard from "../components/RecipeCard"; // Import RecipeCard for rendering each recipe
import { AuthContext } from "../provider/authContext";

const MyRecipes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get the logged-in user from context
  const [myRecipes, setMyRecipes] = useState([]); // State for storing the user's recipes

  useEffect(() => {
      const fetchMyRecipes = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/recipes?createdBy=${user._id}`
          );
          const data = await response.json();
          setMyRecipes(data); // Set the fetched recipes into state
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      };

      fetchMyRecipes();
  }, [user, navigate]);

  // Handle recipe deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/recipes/${id}`, {
        method: "DELETE",

      });
      if (response.ok) {
        setMyRecipes(myRecipes.filter((recipe) => recipe._id !== id)); 
      } else {
        alert("Error deleting recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          My Recipes
        </h2>

        {/* If no recipes are found */}
        {myRecipes.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-lg text-gray-700">
              You haven't added any recipes yet. Start by adding your own!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-xl shadow-lg p-6 space-y-4"
              >
                <RecipeCard recipe={recipe} />
                
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/recipes/update/${recipe._id}`)}
                    className="btn bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;

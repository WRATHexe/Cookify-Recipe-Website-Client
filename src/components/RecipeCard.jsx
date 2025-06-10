import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/authContext";

const RecipeCard = ({ recipe }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => async () => {
    await fetch(`http://localhost:4000/recipes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    if (user) {
      navigate(`/recipes/${id}`);
    } else {
      navigate("/login", { state: { from: `/recipes/${id}` } });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <img
        src={recipe.recipePhoto}
        alt={recipe.recipeTitle}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h3 className="text-xl font-semibold">{recipe.recipeTitle}</h3>
      <p className="text-sm text-gray-600">Cuisine: {recipe.CuisineType}</p>
      <p className="text-sm text-gray-600">Prep Time: {recipe.prepTime} mins</p>

      <button
        onClick={handleDetailsClick(recipe._id)}
        className="text-indigo-600 hover:text-indigo-800 font-semibold btn btn-outline btn-sm rounded-full transition duration-300 hover:bg-indigo-50"
      >
        See Details
      </button>
    </div>
  );
};

export default RecipeCard;

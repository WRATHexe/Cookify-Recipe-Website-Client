import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/authContext";

const RecipeCard = ({ recipe }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDetailsClick = (id) => async () => {
    await fetch(`https://wrath-cookify-server.vercel.app/recipes/${id}`);
    if (user) {
      navigate(`/recipes/${id}`);
    } else {
      navigate("/login", { state: { from: `/recipes/${id}` } });
    }
  };

  return (
    <div className="bg-white hover:shadow-xl transition duration-300 rounded-2xl shadow-md p-5 flex flex-col items-center space-y-4 border border-orange-100">
      <img
        src={
          recipe.photo ||
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        }
        alt={recipe.title}
        className="w-full h-44 object-cover rounded-xl"
      />

      <div className="w-full text-center">
        <h3 className="text-lg font-bold text-orange-600 mb-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Cuisine:</strong> {recipe.cuisineType}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Prep Time:</strong> {recipe.prepTime} mins
        </p>
      </div>

      <button
        onClick={handleDetailsClick(recipe._id)}
        className="mt-2 px-5 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition rounded-full shadow"
      >
        See Details
      </button>
    </div>
  );
};

export default RecipeCard;

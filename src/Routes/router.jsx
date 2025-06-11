import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import AddRecipe from "../pages/AddRecipe";
import AllRecipes from "../pages/AllRecipes";
import ErrorPage from "../pages/ErrorPage";
import ForgotPass from "../pages/ForgotPass";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyRecipes from "../pages/MyRecipes";
import RecipeDetails from "../pages/RecipeDetails";
import Register from "../pages/Register";
import UpdateForm from "../pages/UpdateRecipe";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/recipes",
        element: <AllRecipes></AllRecipes>,
        loader: () => fetch("http://localhost:4000/recipes"),
      },
      {
        path: "/recipes/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "recipes/update/:id",
        element: <UpdateForm></UpdateForm>,
        loader: ({ params }) =>
          fetch(`http://localhost:4000/recipes/${params.id}`),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPass></ForgotPass>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes></MyRecipes>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;

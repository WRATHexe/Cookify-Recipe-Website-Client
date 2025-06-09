import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import AddRecipe from "../pages/AddRecipe";
import AllRecipes from "../pages/AllRecipes";
import ErrorPage from "../pages/ErrorPage";
import ForgotPass from "../pages/ForgotPass";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <h1>Welcome to the Home Page</h1>,
      },
      {
        path: "/all-recipes",
        element: <AllRecipes></AllRecipes>,
        loader: () => fetch("http://localhost:4000/recipes"),
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
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;

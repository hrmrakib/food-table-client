import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import AllFood from "../pages/AllFood";
import FoodPurchase from "../pages/FoodPurchase";
import Gallery from "../pages/Gallery";
import AddFoodItem from "../pages/AddFoodItem";
import PrivateRoute from "./PrivateRoute";
import { baseURL } from "../utils/url";
import MyAddedFood from "../pages/MyAddedFood";
import SingleFood from "../pages/SingleFood";
import MyOrderedFood from "../pages/MyOrderedFood";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/allFood",
        element: <AllFood />,
        loader: () => fetch(`${baseURL}/allFood`),
      },
      {
        path: "/foodPurchase/:id",
        element: (
          <PrivateRoute>
            <FoodPurchase />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${baseURL}/single-food/${params.id}`, {
            credentials: "include",
          }),
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/addFoodItem",
        element: (
          <PrivateRoute>
            <AddFoodItem />
          </PrivateRoute>
        ),
      },
      {
        path: "/myAddedFood",
        element: (
          <PrivateRoute>
            <MyAddedFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/singleFood/:id",
        element: (
          <PrivateRoute>
            <SingleFood />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${baseURL}/single-food/${params.id}`, {
            credentials: "include",
          }),
      },
      {
        path: "/myOrderedFood",
        element: (
          <PrivateRoute>
            <MyOrderedFood />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

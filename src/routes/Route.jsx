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
        element: <FoodPurchase />,
        loader: ({ params }) => fetch(`${baseURL}/single-food/${params.id}`),
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
        element: <MyAddedFood />,
      },
      {
        path: "/singleFood/:id",
        element: <SingleFood />,
        loader: ({ params }) => fetch(`${baseURL}/single-food/${params.id}`),
      },
      {
        path: "/myOrderedFood",
        element: <MyOrderedFood />,
      },
    ],
  },
]);

export default router;

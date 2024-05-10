import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import RegisterPage from "../pages/Register";
import LoginPage from "../pages/Login";
import AllFood from "../pages/AllFood";
import FoodPurchase from "../pages/FoodPurchase";
import Gallery from "../pages/Gallery";

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
      },
      {
        path: "/foodPurchase",
        element: <FoodPurchase />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
    ],
  },
]);

export default router;

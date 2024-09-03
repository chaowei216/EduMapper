import { createBrowserRouter } from "react-router-dom";
import UserTestPage from "../pages/UserTest/UserTestPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Authen/LoginPage";
import ResgisterPage from "../pages/Authen/ResgisterPage";
import ForgotPasswordPage from "../pages/Authen/ForgotPasswordPage";
import PackagePage from "../pages/Package/PackagePage";
import CenterPage from "../pages/CenterPage/CenterPage";
import CenterDetailPage from "../pages/CenterPage/CenterDetailPage";
import CenterRatingPage from "../pages/CenterPage/CenterRatingPage";
import CreateCenterRating from "../components/partial/CenterRating/CreateCenterRating";

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <UserTestPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <ResgisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/package",
    element: <PackagePage />,
  },
  {
    path: "/english-center",
    element: <CenterPage />,
  },
  {
    path: "/english-center-detail",
    element: <CenterDetailPage />,
  },
  {
    path: "/rating",
    element: <CenterRatingPage />,
  },
  {
    path: "/create-rating",
    element: <CreateCenterRating />,
  },
]);

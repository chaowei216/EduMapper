import { createBrowserRouter } from "react-router-dom";
import UserTestPage from "../pages/UserTest/UserTestPage";
import HomePage from "../pages/HomePage/HomePage";

export const router = createBrowserRouter([
  {
    path: "/test",
    element: <UserTestPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

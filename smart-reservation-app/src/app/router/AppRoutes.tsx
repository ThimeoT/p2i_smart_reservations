import { createBrowserRouter } from "react-router";
import PageEquipement from "../../features/equipments/pages/PageEquipement";
import PageCentreDeControle from "../../features/controlCenter/pages/ControlCenterPage";
import AuthPage from "../../features/auth/pages/AuthPage";
import RootLayout from "../views/RootLayout";
import HomePage from "../../features/home/pages/HomePage";
import ProfilePage from "../../features/users/pages/ProfilePage";
import EditProfilePage from "../../features/users/pages/EditProfilePage";
import FallbackRedirect from "./FallbackRedirect";
import NotFoundPage from "../views/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../views/ErrorPage";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FallbackRedirect />,
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "/equipements", element: <PageEquipement /> },
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/profile/edit", element: <EditProfilePage /> },
          {
            element: <AdminRoute />,
            children: [
              { path: "/admin", element: <PageCentreDeControle /> },
              { path: "/users/:id", element: <ProfilePage isAdminView /> },
              { path: "/users/:id/edit", element: <EditProfilePage/>}
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <FallbackRedirect />,
  },
]);

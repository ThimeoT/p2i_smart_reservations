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
import ErrorPage from "../views/RouteErrorPage";
import AdminRoute from "./AdminRoute";
import InviteRoute from "./InviteRoute";
import InitialisationPage from "../../features/auth/pages/InitialisationPage";
import PageCatalogue from "../../features/equipments/pages/PageCatalogue";
import PageAjoutEquipement from "../../features/equipments/pages/PageAjoutEquipement";
import PageTest from "../views/PageTest";
import PageExemplaire from "../../features/exemplaires/pages/PageExemplaire";

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
      // route pour les comptes invités, token requis mais pas statut ACTIF
      element: <InviteRoute />,
      children: [{ path: "/initialisation", element: <InitialisationPage /> }],
    },
    {
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <RootLayout />,
          children: [
            { path: "/equipements", element: <PageCatalogue /> },
            { path: "/equipements/:id", element: <PageEquipement />, errorElement: <NotFoundPage /> },
            { path: "/exemplaires/:id", element: <PageExemplaire />, errorElement: <NotFoundPage /> },

            { path: "/home", element: <HomePage /> },
            { path: "/profile", element: <ProfilePage /> },
            { path: "/profile/edit", element: <EditProfilePage /> },
            {
              element: <AdminRoute />,
              children: [
                { path: "/admin", element: <PageCentreDeControle /> },
                { path: "/users/:id", element: <ProfilePage isAdminView />, errorElement: <NotFoundPage/> },
                { path: "/users/:id/edit", element: <EditProfilePage /> , errorElement: <NotFoundPage/> },
                { path: "/test", element:<PageTest /> },
                {
                  path: "/equipements/ajouter-equipement",
                  element: <PageAjoutEquipement />,
                },
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

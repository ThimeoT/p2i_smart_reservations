import { createBrowserRouter } from 'react-router';
import PageEquipement from '../../features/equipments/pages/EquipmentPage';
import PageCentreDeControle from '../../features/controlCenter/pages/PageCentreDeControle';
import AuthenticationPage from '../../features/auth/pages/AuthenticationPage';
import RootLayout from '../views/RootLayout';
import HomePage from '../../features/home/pages/HomePage';
import ProfilePage from '../../features/users/pages/ProfilePage';
import EditProfilePage from '../../features/users/pages/EditProfilePage';
import FallbackRedirect from './FallbackRedirect';
import NotFoundPage from '../views/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../views/RouteErrorPage';
import AdminRoute from './AdminRoute';
import InviteRoute from './InviteRoute';
import AccountInitialisationPage from '../../features/auth/pages/AccountInitialisationPage';
import CatalogPage from '../../features/equipments/pages/CatalogPage';
import EquipmentFormPage from '../../features/equipments/pages/EquipmentFormPage';
import PageTest from '../views/PageTest';
import PageInstance from '../../features/instances/pages/PageInstance';
import AddReservationPage from '../../features/reservations/pages/AddReservationPage';
import ReservationDetailsPage from '../../features/reservations/pages/ReservationDetailsPage';
import MyReservationsPage from '../../features/reservations/pages/MyReservationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FallbackRedirect />,
  },
  {
    path: '/login',
    element: <AuthenticationPage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    // route pour les comptes invités, token requis mais pas statut ACTIF
    element: <InviteRoute />,
    children: [
      { path: '/initialisation', element: <AccountInitialisationPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/equipements', element: <CatalogPage /> },
          {
            path: '/equipements/:id',
            element: <PageEquipement />,
            errorElement: <NotFoundPage />,
          },
          {
            path: '/instances/:id',
            element: <PageInstance />,
            errorElement: <NotFoundPage />,
          },
          {
            path: '/reservations/mes-reservations',
            element: <MyReservationsPage />,
          },
          { path: '/reservations/creer', element: <AddReservationPage /> },
          {
            path: '/reservations/:id',
            element: <ReservationDetailsPage />,
            errorElement: <NotFoundPage />,
          },

          { path: '/home', element: <HomePage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/profile/edit', element: <EditProfilePage /> },
          {
            element: <AdminRoute />,
            children: [
              { path: '/admin', element: <PageCentreDeControle /> },
              {
                path: '/users/:id',
                element: <ProfilePage isAdminView />,
                errorElement: <NotFoundPage />,
              },
              {
                path: '/users/:id/edit',
                element: <EditProfilePage />,
                errorElement: <NotFoundPage />,
              },
              { path: '/test', element: <PageTest /> },
              {
                path: '/equipements/ajouter-equipement',
                element: <EquipmentFormPage />,
              },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <FallbackRedirect />,
  },
]);

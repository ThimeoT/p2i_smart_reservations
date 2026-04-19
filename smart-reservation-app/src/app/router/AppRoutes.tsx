import { createBrowserRouter } from 'react-router';
import PageEquipement from '../../features/equipments/pages/PageEquipement';
import ControlCenterPage from '../../features/controlCenter/pages/ControlCenterPage';
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
import CatalogPage from '../../features/equipments/pages/PageCatalogue';
import EquipmentFormPage from '../../features/equipments/pages/EquipmentFormPage';
import EquipementsAdminPage from '../../features/equipments/pages/EquipementsAdminPage';
import PageTest from '../views/PageTest';
import PageInstance from '../../features/instances/pages/PageExemplaire';
import PageAdminExemplaires from '../../features/instances/pages/PageAdminExemplaires';
import AddReservationPage from '../../features/reservations/pages/AddReservationPage';
import ReservationDetailsPage from '../../features/reservations/pages/ReservationDetailsPage';
import MyReservationsPage from '../../features/reservations/pages/MyReservationsPage';
import ReservationsAdminPage from '../../features/reservations/pages/ReservationsAdminPage';
import LabelPage from '../../features/label/pages/LabelPage';
import LabelsAdminPage from '../../features/label/pages/LabelsAdminPage';
import UsersAdminPage from '../../features/users/pages/UsersAminPage';
import PageDisponibilites from '../../features/disponibilites/pages/PageDisponibilites';

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
          { path: '/labels/:id', element: <LabelPage /> },
          {
            path: '/exemplaires/:id',
            element: <PageInstance />,
            errorElement: <NotFoundPage />,
          },
          { path: '/disponibilites', element: <PageDisponibilites /> },
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
              { path: '/admin', element: <ControlCenterPage /> },
              { path: '/admin/users', element: <UsersAdminPage /> },
              {
                path: '/admin/users/:id',
                element: <ProfilePage />,
                errorElement: <NotFoundPage />,
              },
              {
                path: '/admin/users/:id/edit',
                element: <EditProfilePage />,
                errorElement: <NotFoundPage />,
              },
              { path: '/admin/test', element: <PageTest /> },
              { path: '/admin/equipements', element: <EquipementsAdminPage /> },
              {
                path: '/equipements/ajouter-equipement',
                element: <EquipmentFormPage />,
              },
              {
                path: '/admin/equipements/:id/modifier',
                element: <EquipmentFormPage />,
              },
              { path: '/admin/labels', element: <LabelsAdminPage /> },
              { path: '/admin/exemplaires', element: <PageAdminExemplaires /> },
              {
                path: '/admin/reservations',
                element: <ReservationsAdminPage />,
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

import { createBrowserRouter } from 'react-router';
import PageEquipement from '../../features/equipments/pages/PageEquipement';
import PageCentreDeControle from '../../features/controlCenter/pages/PageCentreDeControle';
import PageAuthentification from '../../features/auth/pages/PageAuthentification';
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
import PageInitialisationCompte from '../../features/auth/pages/PageInitialisationCompte';
import PageCatalogue from '../../features/equipments/pages/PageCatalogue';
import PagFormulaireEquipement from '../../features/equipments/pages/PageFormulaireEquipement';
import PageTest from '../views/PageTest';
import PageExemplaire from '../../features/exemplaires/pages/PageExemplaire';
import AddReservationPage from '../../features/reservations/pages/AddReservationPage';
import PageReservation from '../../features/reservations/pages/PageReservation';
import PageMesReservations from '../../features/reservations/pages/PageMesReservations';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FallbackRedirect />,
  },
  {
    path: '/login',
    element: <PageAuthentification />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    // route pour les comptes invités, token requis mais pas statut ACTIF
    element: <InviteRoute />,
    children: [
      { path: '/initialisation', element: <PageInitialisationCompte /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/equipements', element: <PageCatalogue /> },
          {
            path: '/equipements/:id',
            element: <PageEquipement />,
            errorElement: <NotFoundPage />,
          },
          {
            path: '/exemplaires/:id',
            element: <PageExemplaire />,
            errorElement: <NotFoundPage />,
          },
          {
            path: '/reservations/mes-reservations',
            element: <PageMesReservations />,
          },
          { path: '/reservations/creer', element: <AddReservationPage /> },
          {
            path: '/reservations/:id',
            element: <PageReservation />,
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
                element: <PagFormulaireEquipement />,
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

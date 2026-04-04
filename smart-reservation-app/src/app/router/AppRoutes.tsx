import {  createBrowserRouter } from 'react-router';
import PageEquipement from '../../features/equipments/pages/PageEquipement';
import PageCentreDeControle from '../../features/controlCenter/pages/ControlCenterPage';
import AuthPage from '../../features/auth/pages/AuthPage';
import RootLayout from '../views/RootLayout';
import HomePage from '../../features/home/pages/HomePage';
import ProfilePage from '../../features/users/pages/ProfilePage';
import EditProfilePage from '../../features/users/pages/EditProfilePage';
import FallbackRedirect from './FallbackRedirect';
import NotFoundPage from '../views/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FallbackRedirect />, 
  },
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/admin',        element: <PageCentreDeControle /> },
          { path: '/equipements',  element: <PageEquipement /> },
          { path: '/home',         element: <HomePage /> },
          { path: '/profile',      element: <ProfilePage /> },
          { path: '/profile/edit', element: <EditProfilePage /> },
          { path: '*',                 element: <NotFoundPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <FallbackRedirect />,
  },
]);
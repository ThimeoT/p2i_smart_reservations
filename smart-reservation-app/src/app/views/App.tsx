import { RouterProvider } from 'react-router';
import { router } from '../router/AppRoutes';
import { AuthProvider } from '../../features/auth/context/AuthProvider';

export default function App() {
  return (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  )
}

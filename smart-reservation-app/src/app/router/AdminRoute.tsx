import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';
import FondEcran from '../views/FondEcran';

export default function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Chargement de la page admin en cours...</p>;
  if (user?.role !== 'ADMIN') return <Navigate to="/404" replace />;
  return (
    <>
      <FondEcran>
        <Outlet />
      </FondEcran>
    </>
  );
}

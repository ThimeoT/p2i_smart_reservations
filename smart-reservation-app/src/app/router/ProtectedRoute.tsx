import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';

export default function ProtectedRoute() {
  const { user, isLoading, sessionExpired } = useAuth();
  if (isLoading) return <div>Chargement en cours...</div>;
  if (!user) return <Navigate to="/login" state={{ deconnecte: sessionExpired }} replace />;

  if (user.statut === 'INVITE')
    return <Navigate to="/initialisation" replace />;

  return (
      <Outlet />
  );
}

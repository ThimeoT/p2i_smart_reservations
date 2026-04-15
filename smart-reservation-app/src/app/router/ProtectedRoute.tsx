import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';
import ContenuPage from '../views/ContenuPage';

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  console.log('[ProtectedRoute] isLoading:', isLoading, '| user:', user);
  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }
  if (!user) return <Navigate to="/login" replace />;

  if (user.statut === 'INVITE') return <Navigate to="/initialisation" replace />

  return (
    <ContenuPage>
      <Outlet />
    </ContenuPage>
  );
}

import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

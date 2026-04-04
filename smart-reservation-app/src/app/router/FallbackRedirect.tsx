import { Navigate } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';

export default function FallbackRedirect() {
  const { user, isLoading } = useAuth();

  console.log('[FallbackRedirect] isLoading:', isLoading, '| user:', user);

  if (isLoading) return null;

  return <Navigate to={user ? '/home' : '/login'} replace />;
}
import { Routes, Route, Navigate } from 'react-router';
import PageEquipement from '../../features/equipments/pages/PageEquipement';
import PageCentreDeControle from '../../features/controlCenter/pages/ControlCenterPage'
import AuthPage from '../../features/auth/pages/AuthPage';
import ProtectedRoute from '../../features/auth/components/ProtectedRoute';
import RootLayout from './RootLayout';
import { useAuth } from '../../features/auth/hooks/useAuth';
import HomePage from '../../features/home/pages/HomePage';

export default function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Vérification de session...</div>
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<AuthPage />} />

      {/* Protégé */}
      <Route
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/app/admin" element={<PageCentreDeControle/>} />
        <Route path="/app/equipements" element = {<PageEquipement/>}/>
        <Route path="/app/home" element = {<HomePage/>}/>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to={user ? '/app/admin' : '/login'} replace />} />
    </Routes>
  );
}

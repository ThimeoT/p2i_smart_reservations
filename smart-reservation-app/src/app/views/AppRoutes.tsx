import { Routes, Route, Navigate } from 'react-router';
import AuthPage from '../../features/auth/pages/AuthPage';
import ProtectedRoute from '../../features/auth/components/ProtectedRoute';
import RootLayout from './RootLayout';

export default function AppRoutes() {
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
        <Route path="/app/admin" element={<div>Page Admin</div>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

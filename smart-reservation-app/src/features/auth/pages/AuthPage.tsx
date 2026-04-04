import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../../../config/fetchClient';
import type { LoginCredentials } from '../types/auth.types';
import AuthForm from '../components/AuthForm';

export default function AuthPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LoginCredentials) => {
    setError(null);
    try {
      await login(data);
      navigate('/home');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.status === 401 ? 'Identifiants incorrects' : 'Erreur serveur',
        );
      } else {
        setError('Erreur réseau');
      }
    }
  };

  return (
    <>
      <h1>Page de connexion</h1>
      <AuthForm
        onSubmit={handleSubmit}
        error={error ?? undefined}
        loading={isLoading}
      />
    </>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/LoginForm';
import type { LoginCredentials } from '../types/auth.types';

export default function AuthPage() {
  const { login: auth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await auth(data);
      navigate('/app/admin');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Page de connexion</h1>
      <LoginForm
        onSubmit={handleSubmit}
        error={error ?? undefined}
        loading={loading}
      />
    </>
  );
}

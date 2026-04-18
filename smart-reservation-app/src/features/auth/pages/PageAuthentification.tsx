import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../../../config/fetchClient';
import type { LoginCredentials } from '../types/auth.types';
import AuthForm from '../components/AuthForm';
import imageHero from '../../../assets/labo_etudiants.jpg';

function SectionHero() {
  return (
    <div className="relative w-full h-64 md:h-96 shrink-0">
      <img
        src={imageHero}
        alt="Équipements Smart Réservations"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 " />
      <div className="absolute inset-0 flex items-center justify-center px-8">
        <h2 className="font-display text-center font-bold text-xl md:text-3xl text-white leading-snug max-w-4/5">
          Nos équipements à votre portée en quelques clics
        </h2>
      </div>
    </div>
  );
}

export default function PageAuthentification() {
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
    <div>
      <SectionHero />
      <div className="flex flex-col items-center gap-2 mt-10 mb-6 px-4 text-center">
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          Connexion
        </h1>
        <p className="text-sm text-taupe-2">
          Connectez-vous pour accéder à l'application
        </p>
      </div>
      <div className="flex justify-center w-full px-4">
        <div className="w-full max-w-sm">
          <AuthForm
            onSubmit={handleSubmit}
            error={error ?? undefined}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

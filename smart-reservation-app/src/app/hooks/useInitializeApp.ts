import { useEffect } from 'react';

import fetchClient from '../../config/fetchClient';
import { getMeApi } from '../../features/auth/api/auth.api';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function useInitializeApp() {
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    // 1. Récupère le cookie XSRF-TOKEN auprès de Spring
    fetchClient
      .get('/csrf')
      .then(() => getMeApi()) // 2. Vérifie si une session existe déjà
      .then(setUser)
      .catch(() => {}) // pas de session → reste sur /login
      .finally(() => setLoading(false));
  }, [setUser, setLoading]);
}

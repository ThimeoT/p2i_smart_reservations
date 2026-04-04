import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { setFetchClientToken } from '../../../config/fetchClient';
import type { AuthUser } from '../types/auth.types';
import { getMeApi } from '../api/auth.api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );
  const [isLoading, setLoading] = useState(
    !!localStorage.getItem('accessToken'),
  );

  const persistToken = (token: string | null) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    setFetchClientToken(token);
  };

  const logout = () => {
    setUser(null);
    persistToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('[AuthProvider] token dans localStorage:', token);
    if (!token) {
      setLoading(false);
      return;
    }
    setFetchClientToken(token);
    getMeApi()
      .then((user) => {
        console.log('[AuthProvider] user rehydraté:', user);
        setUser(user);
      })
      .catch((err) => {
        console.log('[AuthProvider] erreur rehydratation:', err);
        logout();
      })
      .finally(() => {
        console.log('[AuthProvider] isLoading = false');
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        persistToken,
        isLoading,
        setLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

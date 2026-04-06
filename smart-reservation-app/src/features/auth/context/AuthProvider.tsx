import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import tokenManager from '../../../config/tokenManager';
import type { AuthUser } from '../types/auth.types';
import { getMeApi } from '../api/auth.api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(
    tokenManager.get(),
  );
  const [isLoading, setLoading] = useState(!!tokenManager.get());

  const persistToken = (token: string | null) => {
    tokenManager.set(token);
    setAccessToken(token);
  };

  const logout = () => {
    setUser(null);
    persistToken(null);
  };

  useEffect(() => {
    const token = tokenManager.get();
    if (!token) {
      setLoading(false);
      return;
    }
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

import { useContext  } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { LoginCredentials } from '../types/auth.types';
import { loginApi, logoutApi } from '../api/auth.api';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');

  const login = async (credentials: LoginCredentials) => {
    context.setLoading(true);
    try {
      context.persistToken(null);
      const {token, user} = await loginApi(credentials);
      console.log('[useAuth] réponse reçue:', {token, user});
      context.persistToken(token);
      console.log(
        '[useAuth] localStorage après login:',
        localStorage.getItem('accessToken'),
      );
      context.setUser(user);
      return user;
    } finally {
      context.setLoading(false);
    }
  };

  const logout = async () => {
    try{
      await logoutApi()
    } finally{
      context.logout();
    }

  };

  return { ...context, login, logout };
}

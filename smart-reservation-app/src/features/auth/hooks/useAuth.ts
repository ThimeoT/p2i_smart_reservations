import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import type { LoginCredentials } from '../types/auth.types';
import { getMeApi, loginApi, logoutApi } from '../api/auth.api';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');

  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    ctx.setLoading(true);
    try {
      await loginApi(credentials);
      const user = await getMeApi();
      ctx.setUser(user);
      return user;
    } finally {
      ctx.setLoading(false);
    }
  };

  const logout = async () => {
    await logoutApi();
    ctx.logout();
    navigate('/login');
  };

  return { ...ctx, login, logout };
}

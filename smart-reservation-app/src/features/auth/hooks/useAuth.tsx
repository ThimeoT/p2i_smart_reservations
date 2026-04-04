import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { LoginCredentials } from '../types/auth.types';
import { loginApi } from '../api/auth.api';
import { setFetchClientToken } from '../../../config/fetchClient';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans AuthProvider');

  useEffect(()=> {
    setFetchClientToken(context.accessToken)
  },  [context.accessToken])

  const login = async (credentials: LoginCredentials) => {
  context.setLoading(true)
  try {
    const { token, mail, role, id } = await loginApi(credentials)
    console.log('[useAuth] token reçu:', token);    
    setFetchClientToken(token)
    context.persistToken(token)
    console.log('[useAuth] localStorage après login:',    
      localStorage.getItem('accessToken'));
    context.setUser({ mail, role, id })
    return { mail, role, id }
  } finally {
    context.setLoading(false)
  }
}

  const logout = () => {
    context.logout();
    setFetchClientToken(null);
  };

  return { ...context, login, logout };
}

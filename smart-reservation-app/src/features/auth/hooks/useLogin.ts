import { useAuth } from './useAuth';
import { loginApi, getMeApi } from '../api/auth.api';
import type { AuthUser } from '../types/auth.types';
import type { LoginCredentials } from '../types/auth.types';

export function useLogin() {
  
  const { setUser } = useAuth();

  const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
    await loginApi(credentials);
    const user = await getMeApi();
    setUser(user);
    return user;
  };

  return { login };
}

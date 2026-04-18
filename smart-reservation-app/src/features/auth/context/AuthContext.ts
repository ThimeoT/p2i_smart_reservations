import { createContext } from 'react';
import type { AuthUser } from '../types/auth.types';

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  accessToken: string | null;
  persistToken: (token: string | null) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  sessionExpired: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

import { createContext, useState } from 'react';
import type { AuthUser } from '../types/auth.types';

interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, isLoading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

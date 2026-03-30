import { createContext, useContext, useState } from 'react'
import type { AuthUser } from '../types/auth.types'

interface AuthContextType {
  user: AuthUser | null
  setUser: (user: AuthUser) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


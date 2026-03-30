import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

interface Props {
  roles: string[]
  children: React.ReactNode
}

export default function RoleGuard({ roles, children }: Props) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.role)) return <Navigate to="/403" replace />
  return <>{children}</>
}

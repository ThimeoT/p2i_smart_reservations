import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../features/auth/hooks/useAuth'
import ContenuPage from '../views/ContenuPage'

export default function InviteRoute() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  if (user.statut === 'ACTIF') return <Navigate to="/home" replace />

  return (
    <ContenuPage>
      <Outlet />
    </ContenuPage>
  )
}
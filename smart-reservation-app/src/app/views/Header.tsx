import { useAuth } from '../../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header>
      <span>{user?.mail}</span>
      <button onClick={handleLogout}>Déconnexion</button>
    </header>
  )
}
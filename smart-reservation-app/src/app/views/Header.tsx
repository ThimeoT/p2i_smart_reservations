import { useAuth } from '../../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router'
import logoSmartReservations from '../../assets/logo_smart_reservations.svg'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header>
      <img height="48px" src ={logoSmartReservations} onClick={()=>navigate("/app/home")}/>
      <span>{user?.mail}</span>
      <button onClick={handleLogout}>Déconnexion</button>
    </header>
  )
}
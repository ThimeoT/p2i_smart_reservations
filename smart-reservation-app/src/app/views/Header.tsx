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
    <header className="w-full flex flex-row p-4 gap-4">
      <img className='h-12' src ={logoSmartReservations} onClick={()=>navigate("/home")}/>
      <div>{user?.mail}</div>
      <button onClick={handleLogout}>Déconnexion</button>
      <button onClick={()=>navigate(-1)}>Retour</button>
    </header>
  )
}

// import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';

// export default function Header() {
//   return (
//     <header className="flex items-center justify-between bg-gray-100 p-4">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <img
//           src="path/to/your/smart-reservations-logo.png"
//           alt="SMART Réservations Logo"
//           className="h-10"
//         />
//       </div>

//       {/* Icônes */}
//       <div className="flex items-center space-x-4">
//         <BellIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
//         <Bars3Icon className="h-6 w-6 text-gray-700 cursor-pointer" />
//       </div>
//     </header>


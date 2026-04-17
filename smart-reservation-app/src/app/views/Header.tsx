import { useNavigate } from 'react-router'
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import logoSmartReservations from '../../assets/logo_smart_reservations.svg'
import PageMenu from './PageMenu';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate()
    const [menuOuvert, setMenuOuvert] = useState(false);


  return (
    <>
      <header className="w-full flex flex-row items-center justify-between px-4 py-3 bg-beige-1 shadow-sm">
        <img
          className="h-14 cursor-pointer"
          src={logoSmartReservations}
          onClick={() => navigate('/home')}
        />
        <div className="flex items-center gap-4">
          <BellIcon className="h-6 w-6 cursor-pointer" />
          <Bars3Icon
            className="h-7 w-7 cursor-pointer"
            onClick={() => setMenuOuvert(true)}
          />
        </div>
      </header>
      <PageMenu ouvert={menuOuvert} onFermer={() => setMenuOuvert(false)} />
    </>
  )
}


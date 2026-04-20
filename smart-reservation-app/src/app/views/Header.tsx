import { useNavigate } from 'react-router';
import { Bars3Icon } from '@heroicons/react/24/outline';
import logoSmartReservations from '../../assets/logo_smart_reservations.svg';
import MenuPage from './MenuPage';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex h-23 w-full flex-row items-center justify-between border-b-2 border-taupe-1 bg-beige-1 px-8 py-4 shadow-sm">
        <img
          className="h-15 cursor-pointer"
          src={logoSmartReservations}
          onClick={() => navigate('/home')}
        />
        <button
          className="flex items-center gap-1.5 cursor-pointer text-bleu-fonce-1 hover:opacity-70 transition-opacity"
          onClick={() => setMenuOuvert(!menuOuvert)}
        >
          <Bars3Icon className="h-11 w-11 p-2 stroke-bleu-fonce-1" />
          <span className="text-sm font-medium">Menu</span>
        </button>
      </header>
      <MenuPage ouvert={menuOuvert} onFermer={() => setMenuOuvert(false)} />
    </>
  );
}

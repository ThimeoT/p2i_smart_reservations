import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import animatedLinkClass from '../../shared/stylesClass/animatedLinkClass';
import { useAuth } from '../../features/auth/hooks/useAuth';

interface PageMenuProps {
  ouvert: boolean;
  onFermer: () => void;
}

const liensNav = [
  { label: 'Accueil', path: '/home' },
  { label: 'Catalogue', path: '/equipements' },
  { label: 'Réservations', path: '/reservations/mes-reservations' },
  { label: 'Profil', path: '/profile' },
  { label: 'Aide / Contact', path: '/aide' },
];

export default function MenuPage({ ouvert, onFermer }: PageMenuProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onFermer();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onFermer]);

  const handleNavigation = (path: string) => {
    onFermer();
    navigate(path);
  };

  const handleLogout = async () => {
    onFermer();
    await logout();
    navigate('/login');
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 top-23 z-50 flex w-full flex-col items-end gap-7 bg-taupe-2 px-8 py-10 text-beige-1 transition-opacity duration-300 ${
        ouvert ? 'opacity-95' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onFermer}
    >
      <div
        className="flex flex-col gap-2 md:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-4 font-display text-4xl md:text-6xl font-bold text-end">
          Menu
        </h1>
        <nav className="flex flex-col gap-5">
          {liensNav.map(({ label, path }) => (
            <button
              key={path}
              className={`${animatedLinkClass} font-extralight text-2xl md:text-3xl`}
              onClick={() => handleNavigation(path)}
            >
              {label}
            </button>
          ))}
        </nav>


        <div className="mt-4 border-t border-beige-1/20 pt-4 flex flex-col gap-5">
          <button
            className={`${animatedLinkClass} font-extralight text-2xl md:text-3xl text-red-200`}
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </div>

      <button
        className={`${animatedLinkClass} mt-auto font-extralight text-2xl md:text-3xl md:px-16`}
      >
        Quitter le menu
      </button>
    </div>
  );
}

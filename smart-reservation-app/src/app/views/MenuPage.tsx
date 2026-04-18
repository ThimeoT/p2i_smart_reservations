import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import animatedLinkClass from '../../shared/stylesClass/animatedLinkClass';

interface PageMenuProps {
  ouvert: boolean;
  onFermer: () => void;
}

const liens = [
  { label: 'Accueil', path: '/home' },
  { label: 'Catalogue', path: '/equipements' },
  { label: 'Mes Réservations', path: '/reservations/mes-reservations' },
  { label: 'Ma Liste', path: '/liste' },
  { label: 'Mon Profil', path: '/profile' },
  { label: 'Aide / Contact', path: '/aide' },
];

export default function MenuPage({ ouvert, onFermer }: PageMenuProps) {
  const navigate = useNavigate();

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

  return (
    <div
      className={`fixed inset-X-0 bottom-0 top-23 z-50 flex w-full flex-col items-end gap-7 bg-taupe-2 px-8 py-10 text-beige-1 transition-opacity duration-300 ${
        ouvert ? 'opacity-80' : 'opacity-0 pointer-events-none'
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
          {liens.map(({ label, path }) => (
            <button
              key={path}
              className={`${animatedLinkClass} font-extralight text-2xl md:text-3xl`}
              onClick={() => handleNavigation(path)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <button
        className={`${animatedLinkClass} font-extralight text-2xl md:text-3xl`}
      >
        Quitter le menu
      </button>
    </div>
  );
}

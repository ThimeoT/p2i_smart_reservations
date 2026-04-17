import { useNavigate } from 'react-router';

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

export default function PageMenu({ ouvert, onFermer }: PageMenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    onFermer();
    navigate(path);
  };

  return (
    <div
      className={`fixed  inset-0 z-50 bg-taupe-1 text-beige-1 flex flex-col p-8 justify-center items-center transition-opacity duration-300 ${
        ouvert ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <h1 className="font-display font-bold text-2xl mb-8">Menu</h1>

      <nav className="flex flex-col gap-6 flex-1">
        {liens.map(({ label, path }) => (
          <button
            key={path}
            className="text-left font-display text-xl text-beige-1 hover:opacity-70 transition-opacity"
            onClick={() => handleNavigation(path)}
          >
            {label}
          </button>
        ))}
      </nav>

      <button
        className="text-left font-display text-xl text-beige-1 hover:opacity-70 transition-opacity"
        onClick={onFermer}
      >
        Quitter le menu
      </button>
    </div>
  );
}

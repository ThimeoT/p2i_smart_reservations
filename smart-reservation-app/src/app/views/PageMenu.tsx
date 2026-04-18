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
      className={`fixed inset-x-0 bottom-0 top-23 z-50 flex flex-col  items-center bg-taupe-1 px-8 py-10 text-beige-1 transition-opacity duration-300 gap-7 ${
        ouvert ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-1 flex-col  gap-2">
        <h1 className="mb-4 font-display text-4xl md:text-6xl font-bold">Menu</h1>
        <nav className="flex flex-col gap-5">
          {liens.map(({ label, path }) => (
            <button
              key={path}
              className="text-left font-display font-extralight text-2xl md:text-3xl text-beige-1 transition-opacity hover:opacity-70"
              onClick={() => handleNavigation(path)}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <button
        className="text-left font-display font-extralight text-2xl md:text-3xl text-beige-1 transition-opacity hover:opacity-70"
        onClick={onFermer}
      >
        Quitter le menu
      </button>

    </div>
  );
}

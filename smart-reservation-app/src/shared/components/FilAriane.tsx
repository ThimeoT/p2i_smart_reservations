import { useNavigate } from 'react-router';
import { useNavigationHistory } from '../../app/context/NavigationHistoryContext';

const ROUTE_NAMES: [RegExp, string][] = [
  [/^\/home$/, 'Accueil'],
  [/^\/equipements$/, 'Catalogue'],
  [/^\/equipements\/ajouter-equipement$/, 'Ajouter un équipement'],
  [/^\/equipements\/\d+$/, 'Équipement'],
  [/^\/labels\/\d+$/, 'Label'],
  [/^\/admin\/labels$/, 'Labels'],
  [/^\/instances\/\d+$/, 'Exemplaire'],
  [/^\/reservations\/mes-reservations$/, 'Mes Réservations'],
  [/^\/reservations\/creer$/, 'Créer une réservation'],
  [/^\/reservations\/\d+$/, 'Réservation'],
  [/^\/admin$/, 'Centre de contrôle'],
  [/^\/admin\/users$/, 'Utilisateurs'],
  [/^\/admin\/exemplaires$/, 'Exemplaires'],
  [/^\/admin\/reservations$/, 'Réservations'],
  [/^\/profile$/, 'Mon Profil'],
  [/^\/profile\/edit$/, 'Modifier le profil'],
  [/^\/users\/\d+$/, 'Profil utilisateur'],
  [/^\/disponibilites$/, 'Disponibilités'],
];

function getPageName(path: string): string {
  for (const [pattern, pathName] of ROUTE_NAMES) {
    if (pattern.test(path)) return pathName;
  }
  return path;
}

export default function FilAriane() {
  const navigate = useNavigate();
  const { history, popTo } = useNavigationHistory();

  if (history.length <= 1) return null;

  const previousPath = history[history.length - 2];
  const label = getPageName(previousPath);

  const handleClick = () => {
    popTo(previousPath);
    navigate(previousPath);
  };

  return (
    <nav className="fixed px-4 py-2 text-sm text-taupe-2 bg-beige-1 rounded-b-lg">
      <button onClick={handleClick} className="transition-opacity hover:opacity-70">
        ← Retour à la page {label}
      </button>
    </nav>
  );
}

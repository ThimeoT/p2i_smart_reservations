import { useNavigate } from 'react-router';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useNavigationHistory } from '../../app/context/NavigationHistoryContext';
import animatedLinkClass from '../stylesClass/animatedLinkClass';

const ROUTE_LABELS: [RegExp, string][] = [
  [/^\/home$/, 'Accueil'],
  [/^\/equipements$/, 'Catalogue'],
  [/^\/equipements\/ajouter-equipement$/, 'Ajouter un équipement'],
  [/^\/equipements\/\d+$/, 'Équipement'],
  [/^\/instances\/\d+$/, 'Instance'],
  [/^\/reservations\/mes-reservations$/, 'Mes Réservations'],
  [/^\/reservations\/creer$/, 'Créer une réservation'],
  [/^\/reservations\/\d+$/, 'Réservation'],
  [/^\/admin$/, 'Centre de contrôle'],
  [/^\/profile$/, 'Mon Profil'],
  [/^\/profile\/edit$/, 'Modifier le profil'],
  [/^\/users\/\d+$/, 'Profil utilisateur'],
];

function getPageLabel(path: string): string {
  for (const [pattern, label] of ROUTE_LABELS) {
    if (pattern.test(path)) return label;
  }
  return 'la page précédente';
}

export default function BackLink() {
  const navigate = useNavigate();
  const { previousPath } = useNavigationHistory();

  if (!previousPath) return null;

  return (
    <button
      onClick={() => navigate(previousPath)}
      className={`${animatedLinkClass} flex items-center gap-1 px-8 py-2  text-taupe-1 transition-opacity hover:opacity-70`}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      Retour à la page {getPageLabel(previousPath)}
    </button>
  );
}

import { useNavigate } from 'react-router';
import type { ReservationResume } from '../../../features/reservations/types/reservation.types';

const STATUT_LABELS: Record<string, string> = {
  EN_ATTENTE: 'En attente',
  VALIDEE: 'Validée',
  REFUSEE: 'Refusée',
  SUPPRIMEE: 'Supprimée',
};

const STATUT_COLORS: Record<string, string> = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
  VALIDEE: 'bg-green-100 text-green-800',
  REFUSEE: 'bg-red-100 text-red-700',
  SUPPRIMEE: 'bg-slate-100 text-slate-500',
};

interface Props {
  reservation: ReservationResume;
}

export default function CarteReservation({ reservation }: Props) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => navigate(`/reservations/${reservation.id}`)}
      className="grid cursor-pointer grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-4 gap-y-1 rounded-xl border-2 border-taupe-1 bg-transparent p-4 transition-shadow hover:shadow-md"
    >
      {/* Titre — toute la largeur */}
      <p className="col-span-2 truncate font-semibold text-slate-900">
        {reservation.titre}
      </p>

      {/* Infos sessions/équipements — colonne gauche */}
      <div className="min-w-0">
        <p className="text-xs text-slate-500">
          {reservation.nombreSessions} session
          {reservation.nombreSessions > 1 ? 's' : ''} ·{' '}
          {reservation.nombreEquipements} équipement
          {reservation.nombreEquipements > 1 ? 's' : ''}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          {reservation.utilisateur.prenom} {reservation.utilisateur.nom}
        </p>
      </div>

      {/* Statut — colonne droite, s'étend sur 2 lignes */}
      <span
        className={`row-span-2 self-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUT_COLORS[reservation.statut] ?? 'bg-slate-100 text-slate-700'}`}
      >
        {STATUT_LABELS[reservation.statut] ?? reservation.statut}
      </span>
    </div>
  );
}

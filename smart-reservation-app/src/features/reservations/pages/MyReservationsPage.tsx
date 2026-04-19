import { useState } from 'react';
import { useNavigate } from 'react-router';
import TitrePage from '../../../shared/components/typography/TitrePage';
import Button from '../../../shared/components/Bouton';
import ReservationCard from '../../../shared/components/cards/ReservationCard';
import { useMyReservations } from '../hooks/useMyReservations';
import type { StatutReservation } from '../types/reservation.types';

const FILTRES: { label: string; value: StatutReservation | 'TOUTES' }[] = [
  { label: 'Toutes', value: 'TOUTES' },
  { label: 'En attente', value: 'EN_ATTENTE' },
  { label: 'Validées', value: 'VALIDEE' },
  { label: 'Refusées', value: 'REFUSEE' },
];

export default function MyReservationsPage() {
  const navigate = useNavigate();
  const { reservations, isLoading, error } = useMyReservations();
  const [filtre, setFiltre] = useState<StatutReservation | 'TOUTES'>('TOUTES');

  const reservationsFiltrees =
    filtre === 'TOUTES'
      ? reservations
      : reservations.filter((r) => r.statut === filtre);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TitrePage titre="Mes Réservations" />
        <Button
          size="small"
          text="Nouvelle réservation"
          onClick={() => navigate('/reservations/creer')}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {FILTRES.map((f) => (
          <button
            key={f.value}
            onClick={() => setFiltre(f.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filtre === f.value
                ? 'bg-bleu-1 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-sm text-slate-400">Chargement…</p>}
      {error && (
        <p className="text-sm text-red-600">Erreur lors du chargement.</p>
      )}

      <div className="space-y-3">
        {reservationsFiltrees.map((r) => (
          <ReservationCard key={r.id} reservation={r} />
        ))}
        {!isLoading && reservationsFiltrees.length === 0 && (
          <p className="text-sm text-slate-400">Aucune réservation.</p>
        )}
      </div>
    </div>
  );
}

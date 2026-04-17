import { useState } from 'react';
import { useNavigate } from 'react-router';
import TitreDePage from '../../../shared/components/typography/TitreDePage';
import Bouton from '../../../shared/components/Bouton';
import CarteReservation from '../../../shared/components/cards/CarteReservation';
import { useAllReservations } from '../hooks/useAllReservations';
import type { StatutReservation } from '../types/reservation.types';

const FILTRES: { label: string; value: StatutReservation | 'TOUTES' }[] = [
  { label: 'Toutes', value: 'TOUTES' },
  { label: 'En attente', value: 'EN_ATTENTE' },
  { label: 'Validées', value: 'VALIDEE' },
  { label: 'Refusées', value: 'REFUSEE' },
];

export default function PageMesReservations() {
  const navigate = useNavigate();
  const { reservations, isLoading, error } = useAllReservations();
  const [filtre, setFiltre] = useState<StatutReservation | 'TOUTES'>('TOUTES');

  const reservationsFiltrees = filtre === 'TOUTES'
    ? reservations
    : reservations.filter((r) => r.statut === filtre);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <TitreDePage titre="Réservations" />
        <Bouton size="small" text="Nouvelle réservation" onClick={() => navigate('/reservations/creer')} />
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
      {error && <p className="text-sm text-red-600">Erreur lors du chargement.</p>}

      <div className="space-y-3">
        {reservationsFiltrees.map((r) => (
          <CarteReservation key={r.id} reservation={r} />
        ))}
        {!isLoading && reservationsFiltrees.length === 0 && (
          <p className="text-sm text-slate-400">Aucune réservation.</p>
        )}
      </div>
    </div>
  );
}

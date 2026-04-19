import { useState } from 'react';
import TitrePage from '../../../shared/components/typography/TitrePage';
import ReservationCard from '../../../shared/components/cards/ReservationCard';
import ErrorCard from '../../../shared/components/cards/ErrorCard';
import CalendrierSessions from '../components/CalendrierSessions';
import TimelineSessions from '../components/TimelineSessions';
import { useAllReservations } from '../hooks/useAllReservations';
import type { StatutReservation } from '../types/reservation.types';

const FILTRES: { label: string; value: StatutReservation | 'TOUTES' }[] = [
  { label: 'Toutes', value: 'TOUTES' },
  { label: 'En attente', value: 'EN_ATTENTE' },
  { label: 'Validées', value: 'VALIDEE' },
  { label: 'Refusées', value: 'REFUSEE' },
  { label: 'Supprimées', value: 'SUPPRIMEE' },
];

type Vue = 'liste' | 'calendrier';

export default function ReservationsAdminPage() {
  const [vue, setVue] = useState<Vue>('liste');
  const [filtre, setFiltre] = useState<StatutReservation | 'TOUTES'>('TOUTES');
  const [month, setMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  const { reservations, isLoading, error } = useAllReservations();

  const reservationsFiltrees =
    filtre === 'TOUTES' ? reservations : reservations.filter((r) => r.statut === filtre);

  return (
    <div className="flex flex-col gap-4">
      <TitrePage titre="Réservations" />

      <div className="flex gap-2">
        {(['liste', 'calendrier'] as Vue[]).map((v) => (
          <button
            key={v}
            onClick={() => setVue(v)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              vue === v ? 'bg-bleu-fonce-1 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {v === 'liste' ? 'Liste' : 'Calendrier'}
          </button>
        ))}
      </div>

      {error && <ErrorCard error={error} />}
      {isLoading && <p className="text-sm text-slate-400">Chargement…</p>}

      {vue === 'liste' && !isLoading && (
        <>
          <div className="flex gap-2 flex-wrap">
            {FILTRES.map((f) => (
              <button
                key={f.value}
                onClick={() => setFiltre(f.value)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  filtre === f.value
                    ? 'bg-bleu-fonce-1 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {reservationsFiltrees.length === 0 ? (
              <p className="text-sm text-slate-400">Aucune réservation.</p>
            ) : (
              reservationsFiltrees.map((r) => <ReservationCard key={r.id} reservation={r} />)
            )}
          </div>
        </>
      )}

      {vue === 'calendrier' && !isLoading && (
        <>
          <CalendrierSessions
            reservations={reservations}
            month={month}
            onMonthChange={setMonth}
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />
          {selectedDay && <TimelineSessions day={selectedDay} reservations={reservations} />}
        </>
      )}
    </div>
  );
}

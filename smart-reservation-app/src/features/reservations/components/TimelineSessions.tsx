import { useNavigate } from 'react-router';
import type { ReservationResume, StatutReservation } from '../types/reservation.types';

const HOUR_START = 8;
const HOUR_END = 20;
const TOTAL_MINUTES = (HOUR_END - HOUR_START) * 60;

const STATUT_COLOR: Record<StatutReservation, string> = {
  EN_ATTENTE: 'bg-jaune-1',
  VALIDEE: 'bg-vert-1',
  REFUSEE: 'bg-rouge-1',
  SUPPRIMEE: 'bg-slate-300',
};

function toPercent(date: Date): number {
  const minutes = (date.getHours() - HOUR_START) * 60 + date.getMinutes();
  return Math.max(0, Math.min(100, (minutes / TOTAL_MINUTES) * 100));
}

interface Props {
  day: Date;
  reservations: ReservationResume[];
}

export default function TimelineSessions({ day, reservations }: Props) {
  const navigate = useNavigate();
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
  const hours = Array.from({ length: HOUR_END - HOUR_START + 1 }, (_, i) => HOUR_START + i);
  const hourWidth = 100 / (HOUR_END - HOUR_START);

  const sessionsOfDay = reservations.flatMap((r) =>
    r.sessions
      .filter((s) => new Date(s.debut) <= dayEnd && new Date(s.fin) >= dayStart)
      .map((s) => ({ session: s, reservation: r })),
  );

  const dayLabel = day.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="rounded-xl border border-taupe-1 bg-white p-4 space-y-3">
      <p className="font-semibold text-slate-800 capitalize">{dayLabel}</p>

      {sessionsOfDay.length === 0 ? (
        <p className="text-sm text-slate-400">Aucune session ce jour.</p>
      ) : (
        <>
          <div className="flex">
            {hours.map((h) => (
              <span key={h} className="text-xs text-slate-400 shrink-0" style={{ width: `${hourWidth}%` }}>
                {h}h
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {sessionsOfDay.map(({ session, reservation }) => {
              const left = toPercent(new Date(session.debut));
              const width = Math.max(toPercent(new Date(session.fin)) - left, 2);
              const startStr = new Date(session.debut).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
              const endStr = new Date(session.fin).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={session.id} className="flex items-center gap-2">
                  <button
                    className="text-xs text-bleu-fonce-1 hover:underline w-32 shrink-0 truncate text-left"
                    onClick={() => navigate(`/reservations/${reservation.id}`)}
                  >
                    {reservation.titre}
                  </button>
                  <div className="relative flex-1 h-7 bg-slate-100 rounded overflow-hidden">
                    <div
                      className={`absolute top-0.5 h-6 rounded opacity-80 flex items-center px-1.5 overflow-hidden ${STATUT_COLOR[reservation.statut]}`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={`${startStr}–${endStr} · ${reservation.utilisateur.prenom} ${reservation.utilisateur.nom}`}
                    >
                      <span className="text-xs text-white truncate whitespace-nowrap">
                        {startStr}–{endStr}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 text-xs text-slate-600 pt-1">
            {(['EN_ATTENTE', 'VALIDEE', 'REFUSEE'] as StatutReservation[]).map((st) => (
              <span key={st} className="flex items-center gap-1">
                <span className={`h-2.5 w-2.5 rounded-sm ${STATUT_COLOR[st]}`} />
                {st === 'EN_ATTENTE' ? 'En attente' : st === 'VALIDEE' ? 'Validée' : 'Refusée'}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import type { Emprunt } from '../../reservations/types/emprunt.types';
import type { Exemplaire } from '../../instances/types/exemplaire.types';

const HOUR_START = 8;
const HOUR_END = 20;
const TOTAL_MINUTES = (HOUR_END - HOUR_START) * 60;

function toPercent(date: Date): number {
  const minutes = (date.getHours() - HOUR_START) * 60 + date.getMinutes();
  return Math.max(0, Math.min(100, (minutes / TOTAL_MINUTES) * 100));
}

interface Props {
  day: Date;
  equipementIds: number[];
  equipements: { id: number; nom: string }[];
  empruntsByEquipement: Record<number, Emprunt[]>;
  allExemplaires: Exemplaire[];
}

export default function TimelineJour({ day, equipementIds, equipements, empruntsByEquipement, allExemplaires }: Props) {
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
  const hours = Array.from({ length: HOUR_END - HOUR_START + 1 }, (_, i) => HOUR_START + i);
  const hourWidth = 100 / (HOUR_END - HOUR_START);

  const dayLabel = day.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="space-y-4 rounded-xl border border-taupe-1 bg-white p-4">
      <p className="font-semibold text-slate-800 capitalize">{dayLabel}</p>

      {equipementIds.map((equipementId) => {
        const nom = equipements.find((e) => e.id === equipementId)?.nom ?? '';
        const exemplaires = allExemplaires.filter((ex) => ex.equipement.id === equipementId);
        const emprunts = (empruntsByEquipement[equipementId] ?? []).filter(
          (e) =>
            e.statut !== 'ANNULE' &&
            e.statut !== 'TERMINE' &&
            new Date(e.session.debut) <= dayEnd &&
            new Date(e.session.fin) >= dayStart,
        );

        return (
          <div key={equipementId} className="space-y-2">
            <p className="text-sm font-medium text-bleu-fonce-1">{nom}</p>

            {/* Axe horaire */}
            <div className="flex pl-20">
              {hours.map((h) => (
                <span key={h} className="text-xs text-slate-400 shrink-0" style={{ width: `${hourWidth}%` }}>
                  {h}h
                </span>
              ))}
            </div>

            {/* Une ligne par exemplaire */}
            {exemplaires.map((ex) => {
              const exEmprunts = emprunts.filter((e) => e.exemplaire.id === ex.id);
              return (
                <div key={ex.id} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-20 shrink-0 truncate">{ex.nomSerie}</span>
                  <div className="relative flex-1 h-6 bg-slate-100 rounded overflow-hidden">
                    {exEmprunts.length === 0 ? (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400">libre</div>
                    ) : (
                      exEmprunts.map((e) => {
                        const left = toPercent(new Date(e.session.debut));
                        const width = Math.max(toPercent(new Date(e.session.fin)) - left, 2);
                        const startStr = new Date(e.session.debut).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                        const endStr = new Date(e.session.fin).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                        return (
                          <div
                            key={e.id}
                            className="absolute top-0 h-full bg-rouge-1 opacity-70 rounded"
                            style={{ left: `${left}%`, width: `${width}%` }}
                            title={`${startStr} – ${endStr}`}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

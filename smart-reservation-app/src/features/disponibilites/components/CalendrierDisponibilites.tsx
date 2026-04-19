import { DayPicker } from 'react-day-picker';
import { fr } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import type { EtatJour } from '../types/disponibilite.types';

interface Props {
  month: Date;
  onMonthChange: (month: Date) => void;
  joursEtats: Record<string, EtatJour>;
  selectedDay: Date | undefined;
  onDaySelect: (day: Date | undefined) => void;
}

function dateKey(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function CalendrierDisponibilites({ month, onMonthChange, joursEtats, selectedDay, onDaySelect }: Props) {
  const disponible: Date[] = [];
  const partiel: Date[] = [];
  const indisponible: Date[] = [];

  const daysCount = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysCount; i++) {
    const d = new Date(month.getFullYear(), month.getMonth(), i);
    const etat = joursEtats[dateKey(d)];
    if (etat === 'DISPONIBLE') disponible.push(d);
    else if (etat === 'PARTIEL') partiel.push(d);
    else if (etat === 'INDISPONIBLE') indisponible.push(d);
  }

  return (
    <div className="space-y-3">
      <DayPicker
        locale={fr}
        mode="single"
        month={month}
        onMonthChange={onMonthChange}
        selected={selectedDay}
        onSelect={onDaySelect}
        modifiers={{ disponible, partiel, indisponible }}
        modifiersClassNames={{
          disponible: '!bg-vert-1 !text-white',
          partiel: '!bg-jaune-1',
          indisponible: '!bg-rouge-1 !text-white !line-through !opacity-60',
        }}
      />
      <div className="flex gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-vert-1 inline-block" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-jaune-1 inline-block" /> Partiel
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rouge-1 inline-block" /> Indisponible
        </span>
      </div>
    </div>
  );
}

import { DayPicker } from 'react-day-picker';
import { fr } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import type { ReservationResume } from '../types/reservation.types';

interface Props {
  reservations: ReservationResume[];
  month: Date;
  onMonthChange: (month: Date) => void;
  selectedDay: Date | undefined;
  onDaySelect: (day: Date | undefined) => void;
}

function overlapsDay(debut: string, fin: string, day: Date): boolean {
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
  return new Date(debut) <= dayEnd && new Date(fin) >= dayStart;
}

export default function CalendrierSessions({ reservations, month, onMonthChange, selectedDay, onDaySelect }: Props) {
  const daysCount = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const avecSessions: Date[] = [];

  for (let i = 1; i <= daysCount; i++) {
    const day = new Date(month.getFullYear(), month.getMonth(), i);
    const has = reservations.some(
      (r) =>
        r.statut !== 'SUPPRIMEE' &&
        r.sessions.some((s) => overlapsDay(s.debut, s.fin, day)),
    );
    if (has) avecSessions.push(day);
  }

  return (
    <DayPicker
      locale={fr}
      mode="single"
      month={month}
      onMonthChange={onMonthChange}
      selected={selectedDay}
      onSelect={onDaySelect}
      modifiers={{ avecSessions }}
      modifiersClassNames={{ avecSessions: '!bg-bleu-fonce-1 !text-white' }}
    />
  );
}

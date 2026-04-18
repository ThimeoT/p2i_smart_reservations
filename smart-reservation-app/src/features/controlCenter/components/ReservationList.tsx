import ReservationCard from '../../../shared/components/cards/ReservationCard';
import { useAllReservations } from '../../reservations/hooks/useAllReservations';

export default function ReservationList() {
  const { reservations, isLoading, error } = useAllReservations();
  if (isLoading) return <div>chargement des réservations...</div>;
  if (error)
    return (
      <p>
        {error.name} : {error.message}
      </p>
    );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {reservations.map((reservation) => (
        <ReservationCard reservation={reservation} />
      ))}
    </div>
  );
}

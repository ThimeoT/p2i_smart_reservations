import { useQuery } from '@tanstack/react-query';
import { getMyReservationsApi } from '../api/reservations.api';

export function useMyReservations() {
  const { data: reservations = [], isLoading, error } = useQuery({
    queryKey: ['reservations', 'mine'],
    queryFn: getMyReservationsApi,
  });
  return { reservations, isLoading, error };
}

import { useQuery } from '@tanstack/react-query';
import { getAllReservationsApi } from '../api/reservations.api';

export function useAllReservations() {
  const { data: reservations = [], isLoading, error } = useQuery({
    queryKey: ['reservations'],
    queryFn: getAllReservationsApi,
  });
  return { reservations, isLoading, error };
}

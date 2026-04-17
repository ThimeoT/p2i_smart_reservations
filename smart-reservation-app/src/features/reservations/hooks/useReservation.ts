import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import {
  deleteReservationApi,
  getReservationByIdApi,
  validerReservationApi,
  refuserReservationApi,
} from '../api/reservations.api';
import type { ActionReservationRequest } from '../types/reservation.types';

export function useReservation(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: reservation, isLoading, error } = useQuery({
    queryKey: ['reservation', id],
    queryFn: () => getReservationByIdApi(id),
  });

  const { mutate: supprimerReservation } = useMutation({
    mutationFn: () => deleteReservationApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      navigate('/reservations');
    },
  });

  const { mutate: validerReservation } = useMutation({
    mutationFn: (data: ActionReservationRequest) => validerReservationApi(id, data),
    onSuccess: (updated) => queryClient.setQueryData(['reservation', id], updated),
  });

  const { mutate: refuserReservation } = useMutation({
    mutationFn: (data: ActionReservationRequest) => refuserReservationApi(id, data),
    onSuccess: (updated) => queryClient.setQueryData(['reservation', id], updated),
  });

  return { reservation, isLoading, error, supprimerReservation, validerReservation, refuserReservation };
}

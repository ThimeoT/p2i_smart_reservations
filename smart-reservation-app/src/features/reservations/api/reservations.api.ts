import fetchClient from '../../../config/fetchClient';
import type {
  Reservation,
  ReservationRequest,
  ReservationResume,
  ActionReservationRequest,
} from '../types/reservation.types';

export const getAllReservationsApi = async (): Promise<ReservationResume[]> =>
  fetchClient.get('/reservations');

export const getMyReservationsApi = async (): Promise<ReservationResume[]> =>
  fetchClient.get('/reservations/mes-reservations');

export const getReservationByIdApi = async (id: number): Promise<Reservation> => {
  const data = await fetchClient.get(`/reservations/${id}`);
  return {
    ...data,
    sessions: data.sessions?.map((session: any) => ({
      ...session,
      emprunts: session.emprunts?.map((emprunt: any) => ({
        ...emprunt,
        instance: emprunt.exemplaire,
      })) ?? [],
    })) ?? [],
  };
};

export const createReservationApi = async (
  data: ReservationRequest,
): Promise<Reservation> => fetchClient.postJson('/reservations', data);

export const deleteReservationApi = async (id: number): Promise<void> =>
  fetchClient.delete(`/reservations/${id}`);

export const validerReservationApi = async (
  id: number,
  data: ActionReservationRequest,
): Promise<Reservation> => fetchClient.patchJson(`/reservations/${id}/valider`, data);

export const refuserReservationApi = async (
  id: number,
  data: ActionReservationRequest,
): Promise<Reservation> => fetchClient.patchJson(`/reservations/${id}/refuser`, data);

import fetchClient from '../../../config/fetchClient';
import type { Exemplaire, ExemplaireRequest } from '../types/exemplaire.types';

export const getExemplaireByIdApi = async (id: number): Promise<Exemplaire> => {
  const user = await fetchClient.get(`/exemplaires/${id}`);
  return {
    ...user,
    dateExpiration: new Date(user.dateExpiration),
  };
};

export const getAllExemplairesApi = async (): Promise<Exemplaire[]> => {
  const exemplaires = await fetchClient.get('/exemplaires');
  return exemplaires;
};

export const updateExemplaireApi = async (
  id: number,
  exemplaireRequest: ExemplaireRequest,
): Promise<Exemplaire> => {
  const updated = await fetchClient.putJson(
    `/exemplaires/${id}`,
    exemplaireRequest,
  );
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

export const createExemplaireApi = async (
  exemplaireRequest: ExemplaireRequest,
): Promise<Exemplaire> => {
  const exemplaire = await fetchClient.postJson(
    '/exemplaires',
    exemplaireRequest,
  );
  return exemplaire;
};

export const deleteExemplaireApi = async (id: number): Promise<void> => {
  await fetchClient.delete(`/exemplaires/${id}`);
};

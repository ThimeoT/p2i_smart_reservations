import fetchClient from '../../../config/fetchClient';
import type { Exemplaire, ExemplaireRequest } from '../types/exemplaire.types';

export const getInstanceByIdApi = async (id: number): Promise<Exemplaire> => {
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
  instanceRequest: ExemplaireRequest,
): Promise<Exemplaire> => {
  const updated = await fetchClient.putJson(
    `/exemplaires/${id}`,
    instanceRequest,
  );
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

export const createExemplaireApi = async (
  instanceRequest: ExemplaireRequest,
): Promise<Exemplaire> => {
  const exemplaire = await fetchClient.postJson(
    '/exemplaires',
    instanceRequest,
  );
  return exemplaire;
};

export const deleteInstanceApi = async (id: number): Promise<void> => {
  await fetchClient.delete(`/exemplaires/${id}`);
};

import fetchClient from '../../../config/fetchClient';
import type {
  Equipement,
  EquipementRequest,
  EquipementResume,
} from '../types/equipment.types';

export const getEquipementByIdApi = async (id: number): Promise<Equipement> => {
  const user = await fetchClient.get(`/equipements/${id}`);
  return user;
};

export const getAllEquipementsApi = async (): Promise<EquipementResume[]> => {
  const equipements = await fetchClient.get('/equipements');
  return equipements;
};

export const updateEquipementApi = async (
  id: number,
  equipementRequest: EquipementRequest,
): Promise<Equipement> => {
  const updated = await fetchClient.putJson(
    `/equipements/${id}`,
    equipementRequest,
  );
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

export const createEquipementApi = async (
  equipementRequest: EquipementRequest,
): Promise<Equipement> => {
  const equipement = await fetchClient.postJson(
    '/equipements',
    equipementRequest,
  );
  return equipement;
};

export const deleteEquipementApi = async (id: number): Promise<void> => {
  await fetchClient.delete(`/equipements/${id}`);
};

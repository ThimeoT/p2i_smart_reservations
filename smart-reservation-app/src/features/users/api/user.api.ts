import fetchClient from '../../../config/fetchClient';
import type { User as User } from '../types/user.types';

export const getUserByIdApi = async (id: number): Promise<User> => {
  const user = await fetchClient.get(`/utilisateurs/${id}`);
  return {
    ...user,
    dateExpiration: new Date(user.dateExpiration),
  };
};

export const getAllUsersApi = async (): Promise<User[]> => {
  const users = await fetchClient.get('/utilisateurs');
  return users.map((user: User) => ({
    ...user,
    dateExpiration: new Date(user.dateExpiration),
  }));
};

export const updateUserApi = async (user: User): Promise<User> => {
  const { dateExpiration, ...payload } = user;
  const updated = await fetchClient.putJson(`/utilisateurs/${user.id}`, payload);
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

export const patchDateExpirationApi = async (id: number, dateExpiration: string): Promise<User> => {
  const updated = await fetchClient.patchJson(`/utilisateurs/${id}/date-expiration`, { dateExpiration });
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

export const resetPasswordApi = async (id: number): Promise<string> => {
  const res = await fetchClient.postJson(`/utilisateurs/${id}/reinitialiser-mot-de-passe`, {});
  return res.motDePasseTemporaire;
}

export const deleteUserApi = async (id: number): Promise<void> => {
  await fetchClient.delete(`/utilisateurs/${id}`)
}



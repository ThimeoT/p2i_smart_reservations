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
  const updated = await fetchClient.putJson(`/utilisateurs/${user.id}`, user);
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

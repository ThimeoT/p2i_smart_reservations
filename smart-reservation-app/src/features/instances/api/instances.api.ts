import fetchClient from '../../../config/fetchClient';
import type { Instance, InstanceRequest } from '../types/instance.types';

export const getInstanceByIdApi = async (id: number): Promise<Instance> => {
  const user = await fetchClient.get(`/exemplaires/${id}`);
  return {
    ...user,
    dateExpiration: new Date(user.dateExpiration),
  };
};

export const getAllInstancesApi = async (): Promise<Instance[]> => {
  const instances = await fetchClient.get('/exemplaires');
  return instances;
};

export const updateInstanceApi = async (
  id: number,
  instanceRequest: InstanceRequest,
): Promise<Instance> => {
  const updated = await fetchClient.putJson(
    `/exemplaires/${id}`,
    instanceRequest,
  );
  return {
    ...updated,
    dateExpiration: new Date(updated.dateExpiration),
  };
};

export const createInstanceApi = async (
  instanceRequest: InstanceRequest,
): Promise<Instance> => {
  const instance = await fetchClient.postJson(
    '/exemplaires',
    instanceRequest,
  );
  return instance;
};

export const deleteInstanceApi = async (id: number): Promise<void> => {
  await fetchClient.delete(`/exemplaires/${id}`);
};

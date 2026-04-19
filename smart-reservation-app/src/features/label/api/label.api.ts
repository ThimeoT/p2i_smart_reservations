import fetchClient from '../../../config/fetchClient';
import type { Label, LabelRequest } from '../types/label.types';

export const getAllLabelsApi = async (): Promise<Label[]> => {
  return await fetchClient.get('/labels');
};

export const getLabelByIdApi = async (id: number): Promise<Label> =>
  fetchClient.get(`/labels/${id}`);

export const createLabelApi = async (data: LabelRequest): Promise<Label> =>
  fetchClient.postJson('/labels', data);

export const updateLabelApi = async (id: number, data: LabelRequest): Promise<Label> =>
  fetchClient.putJson(`/labels/${id}`, data);

export const deleteLabelApi = async (id: number): Promise<void> =>
  fetchClient.delete(`/labels/${id}`);
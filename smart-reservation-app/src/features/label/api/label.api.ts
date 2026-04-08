import fetchClient from '../../../config/fetchClient';
import type { Label } from '../types/label.types';

export const getAllLabelsApi = async (): Promise<Label[]> => {
  return await fetchClient.get('/labels');
};
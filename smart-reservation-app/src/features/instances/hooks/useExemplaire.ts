import { useNavigate } from 'react-router';
import type { ExemplaireRequest } from '../types/exemplaire.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteInstanceApi,
  getEmpruntsByExemplaireApi,
  getInstanceByIdApi,
  updateExemplaireApi,
} from '../api/exemplaires';

export function useInstance(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: instance,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['instance', id],
    queryFn: () => getInstanceByIdApi(id),
  });

  const { mutate: updateInstance } = useMutation({
    mutationFn: (data: ExemplaireRequest) => updateExemplaireApi(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(['instance', id], updated);
    },
  });

  const { mutate: deleteInstance } = useMutation({
    mutationFn: () => deleteInstanceApi(id),
    onSuccess: () => navigate('/admin'),
  });

  const { data: emprunts = [], isLoading: empruntsLoading } = useQuery({
    queryKey: ['instance-emprunts', id],
    queryFn: () => getEmpruntsByExemplaireApi(id),
    enabled: !!id,
  });

  return { instance, isLoading, error, updateInstance, deleteInstance, emprunts, empruntsLoading };
}

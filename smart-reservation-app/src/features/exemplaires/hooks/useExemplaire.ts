import { useNavigate } from 'react-router';
import type { ExemplaireRequest } from '../types/exemplaire.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteExemplaireApi,
  getExemplaireByIdApi,
  updateExemplaireApi,
} from '../api/exemplaires.api';

export function useExemplaire(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: exemplaire,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['exemplaire', id],
    queryFn: () => getExemplaireByIdApi(id),
  });

  const { mutate: updateExemplaire } = useMutation({
    mutationFn: (data: ExemplaireRequest) => updateExemplaireApi(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(['exemplaire', id], updated);
    },
  });

  const { mutate: deleteExemplaire } = useMutation({
    mutationFn: () => deleteExemplaireApi(id),
    onSuccess: () => navigate('/admin'),
  });

  return { exemplaire, isLoading, error, updateExemplaire, deleteExemplaire };
}
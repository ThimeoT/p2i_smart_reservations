import { useNavigate } from 'react-router';
import type { EquipementRequest } from '../types/equipment.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteEquipementApi,
  getEquipementByIdApi,
  updateEquipementApi,
} from '../api/equipements.api';

export function useEquipement(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: equipement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['equipement', id],
    queryFn: () => getEquipementByIdApi(id),
    enabled: Number.isFinite(id) && id > 0,
  });

  const { mutate: updateEquipement } = useMutation({
    mutationFn: (data: EquipementRequest) => updateEquipementApi(id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(['equipement', id], updated);
    },
  });

  const { mutate: deleteEquipement } = useMutation({
    mutationFn: () => deleteEquipementApi(id),
    onSuccess: () => navigate('/admin'),
  });

  return { equipement, isLoading, error, updateEquipement, deleteEquipement };
}

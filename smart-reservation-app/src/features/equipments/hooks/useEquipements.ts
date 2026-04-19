import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllEquipementsApi, deleteEquipementApi } from '../api/equipements.api';

export function useEquipements() {
  const queryClient = useQueryClient();

  const { data: equipements = [], isLoading } = useQuery({
    queryKey: ['equipements'],
    queryFn: getAllEquipementsApi,
  });

  const { mutateAsync: deleteEquipement } = useMutation({
    mutationFn: (id: number) => deleteEquipementApi(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipements'] }),
  });

  return { equipements, isLoading, deleteEquipement };
}

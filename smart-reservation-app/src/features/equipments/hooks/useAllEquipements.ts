import { useEffect, useState } from 'react';
import { getAllEquipementsApi } from '../api/equipements.api';
import type { EquipementResume } from '../types/equipment.types';
export default function useAllEquipements() {
  const [equipements, setEquipements] = useState<EquipementResume[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllEquipementsApi()
      .then(setEquipements)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { equipements, loading, error };
}

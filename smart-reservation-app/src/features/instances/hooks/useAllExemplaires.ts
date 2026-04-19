import { useCallback, useEffect, useState } from 'react';
import { getAllExemplairesApi, deleteInstanceApi, updateExemplaireApi } from '../api/exemplaires';
import type { Exemplaire, ExemplaireRequest } from '../types/exemplaire.types';

export default function useAllExemplaires() {
  const [exemplaires, setExemplaires] = useState<Exemplaire[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    getAllExemplairesApi()
      .then(setExemplaires)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const deleteExemplaire = async (id: number) => {
    await deleteInstanceApi(id);
    fetch();
  };

  const updateExemplaire = async (id: number, data: ExemplaireRequest) => {
    await updateExemplaireApi(id, data);
    fetch();
  };

  return { instances: exemplaires, loading, error, deleteExemplaire, updateExemplaire };
}

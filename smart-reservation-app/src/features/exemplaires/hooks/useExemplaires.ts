import { useEffect, useState } from 'react';
import { getAllExemplairesApi } from '../api/exemplaires.api';
import type { Exemplaire } from '../types/exemplaire.types';

export default function useAllExemplaires() {
  const [exemplaires, setExemplaires] = useState<Exemplaire[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllExemplairesApi()
      .then(setExemplaires)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { exemplaires, loading, error };
}

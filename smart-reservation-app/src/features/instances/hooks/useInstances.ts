import { useEffect, useState } from 'react';
import { getAllInstancesApi } from '../api/instances.api';
import type { Instance } from '../types/instance.types';

export default function useAllInstances() {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllInstancesApi()
      .then(setInstances)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { instances, loading, error };
}

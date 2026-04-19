import { useEffect, useState } from 'react';
import { getLabelByIdApi } from '../api/label.api';
import type { Label } from '../types/label.types';

export default function useLabel(id: number) {
  const [label, setLabel] = useState<Label | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getLabelByIdApi(id)
      .then(setLabel)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  return { label, loading, error };
}

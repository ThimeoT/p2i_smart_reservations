import { useEffect, useState } from 'react';
import { getAllLabelsApi } from '../api/label.api';
import type { Label } from '../types/label.types';

export default function useLabels() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllLabelsApi()
      .then(setLabels)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { labels, loading, error };
}
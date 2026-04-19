import { useCallback, useEffect, useState } from 'react';
import { createLabelApi, deleteLabelApi, getAllLabelsApi, updateLabelApi } from '../api/label.api';
import type { Label, LabelRequest } from '../types/label.types';

export default function useLabels() {
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    getAllLabelsApi()
      .then(setLabels)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  
  const createLabel = async (data: LabelRequest) => {
    await createLabelApi(data);
    fetch();
  };

  const updateLabel = async (id: number, data: LabelRequest) => {
    await updateLabelApi(id, data);
    fetch();
  };

  const deleteLabel = async (id: number) => {
    await deleteLabelApi(id);
    fetch();
  };

  return { labels, loading, error, createLabel, updateLabel, deleteLabel };
}
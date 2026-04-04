import { useEffect, useState } from 'react';
import type { User } from '../types/user.types';
import { getAllUsersApi } from '../api/user.api';
import { useAuth } from '../../auth/hooks/useAuth';

export function useAllUsers() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    getAllUsersApi()
      .then(setUsers)
      .catch(setError)
      .finally(() => setLoading(false));
  },[accessToken]);

  return {users, loading ,error};
}

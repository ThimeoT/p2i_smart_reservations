import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { getUserByIdApi, updateUserApi } from '../api/user.api';
import type { User } from '../types/user.types';

export function useCurrentUser() {
  const { user, setUser } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getUserByIdApi(user.id)
      .then(setCurrentUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user?.id]);

  const updateUser = async (data: User) => {
    if (!currentUser) return;
    const updatedUser = await updateUserApi({ ...data, id: currentUser.id });
    setCurrentUser(updatedUser)
    if (user) setUser({ ...user, mail: updatedUser.mail })
    return updatedUser;
  }
  return { currentUser, loading, error, updateUser };
}

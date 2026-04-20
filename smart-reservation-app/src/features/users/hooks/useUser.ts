import { useEffect, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import { deleteUserApi, getUserByIdApi, patchDateExpirationApi, resetPasswordApi, updateUserApi } from '../api/user.api';
import type { User } from '../types/user.types';
import { useNavigate } from 'react-router';


export function useUser( targetId?:number) {

  const navigate=  useNavigate();

  const { user, setUser } = useAuth();
  const isAdmin = useIsAdmin();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const idToLoad = targetId ?? user?.id

  useEffect(() => {
    if(!idToLoad) return;
    setLoading(true);
    getUserByIdApi(idToLoad)
      .then(setCurrentUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [idToLoad]);

  const updateUser = async (data: User) => {
    if (!currentUser) return;
    const updatedUser = await updateUserApi({ ...data, id: currentUser.id });
    setCurrentUser(updatedUser)
    if (user && currentUser.id === user.id) {
      setUser({ ...user, mail: updatedUser.mail });
    }
    return updatedUser;
  }

  const deleteUser = async () => {
  if(!currentUser) return;
  await deleteUserApi(currentUser.id);
  navigate('/admin');
};

  const resetPassword = async (): Promise<string | undefined> => {
    if (!currentUser) return;
    return await resetPasswordApi(currentUser.id);
  };

  const updateDateExpiration = async (dateExpiration: string) => {
    if (!currentUser || !isAdmin) return;
    const updatedUser = await patchDateExpirationApi(currentUser.id, dateExpiration);
    setCurrentUser(updatedUser);
    return updatedUser;
  };

  return { currentUser, loading, error, updateUser, deleteUser, resetPassword, updateDateExpiration };
}

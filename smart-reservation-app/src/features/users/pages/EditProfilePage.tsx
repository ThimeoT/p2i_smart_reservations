import { useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import { useCurrentUser } from '../hooks/useCurrentUser';
import type { User } from '../types/user.types';
import { useNavigate } from 'react-router';


export default function EditProfilePage() {
  const navigate = useNavigate();
  const {
    currentUser,
    loading: loadingUser,
    error: errorUser, updateUser
  } = useCurrentUser();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const handleSubmit = async (data: User) => {
    if (!currentUser) return;
    setSubmitLoading(true);
    setSubmitError(undefined);
    try {
      await updateUser(data);
      navigate('/profile', { state: { saved: true } });
    } catch (error) {
      setSubmitError('Erreur lors de la mise à jour du profil' + { error });
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loadingUser) return <p>Chargement...</p>;
  if (errorUser)
    return (
      <p>
        {errorUser.name} : {errorUser.message}
      </p>
    );
  if (!currentUser) return <p>Utilisateur null</p>;

  return (
    <>
      <h1>Modifier mon profil</h1>
      <ProfileForm
        onSubmit={handleSubmit}
        loading={submitLoading}
        error={submitError}
        currentUser={currentUser}
      />
    </>
  );
}

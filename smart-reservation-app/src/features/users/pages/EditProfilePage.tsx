import { useEffect, useState } from 'react';
import FormulaireProfil from '../components/FormulaireProfil';
import { useUser } from '../hooks/useUser';
import type { User } from '../types/user.types';
import { useNavigate } from 'react-router';
import PageTitle from '../../../shared/components/typography/PageTitle';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const {
    currentUser,
    loading: loadingUser,
    error: errorUser,
    updateUser,
  } = useUser();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) (navigate('/profile'), { state: { saved: true } });
  }, [saved]);

  const handleSubmit = async (data: User) => {
    if (!currentUser) return;
    setSubmitLoading(true);
    setSubmitError(undefined);
    try {
      await updateUser(data);
      navigate('/profile', { state: { saved: true } });
      setSaved(true);
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
      <PageTitle title="Modifier mon profil"/>
      <FormulaireProfil
        onSubmit={handleSubmit}
        loading={submitLoading}
        error={submitError}
        currentUser={currentUser}
      />
    </>
  );
}

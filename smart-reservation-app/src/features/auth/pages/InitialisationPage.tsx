import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { initialisationApi } from '../api/auth.api';
import type { InitialisationFormData } from '../types/auth.types';

interface InitialisationFormFields extends InitialisationFormData {
  confirmationMotDePasse: string;
}

export default function InitialisationPage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InitialisationFormFields>();

  const nouveauMotDePasse = watch('nouveauMotDePasse');

  const onSubmit = async (data: InitialisationFormFields) => {
    if (!user) return;
    const { confirmationMotDePasse, ...payload } = data; // on se sépare du mot de passe de confirmation
    await initialisationApi({ ...payload, id: user.id });
    setUser({ ...user, statut: 'ACTIF' });
    navigate('/app/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Bienvenue !</h1>
      <p>Configurez votre compte avant de continuer.</p>

      <input
        placeholder="Nom"
        {...register('nom', { required: 'Nom requis' })}
      />
      {errors.nom && <p>{errors.nom.message}</p>}

      <input
        placeholder="Prénom"
        {...register('prenom', { required: 'Prénom requis' })}
      />
      {errors.prenom && <p>{errors.prenom.message}</p>}

      <input placeholder="Formation" {...register('formation')} />

      <input
        type="password"
        placeholder="Nouveau mot de passe"
        {...register('nouveauMotDePasse', {
          required: 'Nouveau mot de passe requis',
          minLength: { value: 8, message: '8 caractères minimum' },
        })}
      />
      {errors.nouveauMotDePasse && <p>{errors.nouveauMotDePasse.message}</p>}

      <input
        type="password"
        placeholder="Confirmer le nouveau mot de passe"
        {...register('confirmationMotDePasse', {
          required: 'Confirmation requise',
          validate: (value) =>
            value === nouveauMotDePasse ||
            'Les mots de passe ne correspondent pas',
        })}
      />
      {errors.confirmationMotDePasse && (
        <p>{errors.confirmationMotDePasse.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enregistrement...' : "Accéder à l'application"}
      </button>
    </form>
  );
}

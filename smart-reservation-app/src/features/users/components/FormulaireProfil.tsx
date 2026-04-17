import { useForm } from 'react-hook-form';
import type { User } from '../types/user.types';
import { useNavigate } from 'react-router';
import { useUnsavedChangesBlocker } from '../../../shared/hooks/useUnsavedChangesBlocker';

interface FormulaireProfilProps {
  onSubmit: (data: User) => Promise<void>;
  error?: string;
  loading?: boolean;
  currentUser: User;
}

export default function FormulaireProfil({
  onSubmit,
  error,
  loading,
  currentUser,
}: FormulaireProfilProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<User>({
    defaultValues: {
      nom: currentUser.nom,
      prenom: currentUser.prenom,
      mail: currentUser.mail,
      formation: currentUser.formation,
      dateExpiration: currentUser.dateExpiration
        .toISOString()
        .slice(0, 10) as unknown as Date,
    },
  });

  const { isBlocked, confirm, cancel } = useUnsavedChangesBlocker(
    isDirty && !isSubmitSuccessful,
  );

  return (
    <>
      {error && <p>{error}</p>}
      {isBlocked && (
        <div className="modal">
          <p>
            Des modifications non enregistrées seront perdues. Quitter quand
            même ?
          </p>
          <button onClick={confirm}>Quitter</button>
          <button onClick={cancel}>Rester</button>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault(); // pour éviter de valider automatiquement avec entrée
        }}
      >
        <input
          type="text"
          placeholder={currentUser.nom}
          {...register('nom', { required: 'Nom requis' })}
        />
        {errors.nom && <p>{errors.nom.message}</p>}

        <input
          type="text"
          placeholder={currentUser.prenom}
          {...register('prenom', { required: 'Prénom requis' })}
        />
        {errors.prenom && <p>{errors.prenom.message}</p>}

        <input
          type="email"
          placeholder={currentUser.mail}
          {...register('mail', { required: 'Mail requis' })}
        />
        {errors.mail && <p>{errors.mail.message}</p>}

        <input
          type="text"
          placeholder={currentUser.formation}
          {...register('formation', { required: 'Formation requise' })}
        />
        {errors.formation && <p>{errors.formation.message}</p>}

        <input
          type="date"
          placeholder={currentUser.dateExpiration.toString()}
          {...register('dateExpiration', {
            required: "Date d'expiration requise",
          })}
        />
        {errors.dateExpiration && <p>{errors.dateExpiration.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button type="button" onClick={() => navigate('/profile')}>
          Annuler
        </button>
      </form>
    </>
  );
}

import { useForm } from 'react-hook-form';
import type { EquipementRequest } from '../types/equipment.types';
import { useUnsavedChangesBlocker } from '../../../shared/hooks/useUnsavedChangesBlocker';
import { useNavigate } from 'react-router';

interface userFormProps {
  onSubmit: (data: EquipementRequest) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export default function FormulaireCreationEquipement({
  onSubmit,
  error,
  loading,
}: userFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<EquipementRequest>();

  const { isBlocked, confirm, cancel } = useUnsavedChangesBlocker(isDirty && !isSubmitSuccessful);



  return (
    <>
      {error && <p>{error}</p>}
      {isBlocked && (
        <div className="modal">
          <p>
            Les modifications non enregistrées seront perdues. Quitter quand
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
          placeholder={"Nom"}
          {...register('nom', { required: 'Nom requis' })}
        />
        {errors.nom && <p>{errors.nom.message}</p>}

        <textarea
          placeholder={"description"}
          {...register('description', { required: 'Prénom requis' })}
        />
        {errors.description && <p>{errors.description.message}</p>}


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

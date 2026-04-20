import { useForm } from 'react-hook-form';
import type { User } from '../types/user.types';
import { useNavigate } from 'react-router';
import { useUnsavedChangesBlocker } from '../../../shared/hooks/useUnsavedChangesBlocker';
import FormLayout from '../../../shared/components/form/FormLayout';
import { Input } from '../../../shared/components/form/Input';
import Button from '../../../shared/components/Bouton';

interface FormulaireProfilProps {
  onSubmit: (data: User) => Promise<void>;
  error?: string;
  loading?: boolean;
  currentUser: User;
}

export default function FormulaireProfil({ onSubmit, error, loading, currentUser }: FormulaireProfilProps) {
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
    },
  });

  const { isBlocked, confirm, cancel } = useUnsavedChangesBlocker(isDirty && !isSubmitSuccessful);

  return (
    <FormLayout>
      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {isBlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-xl bg-white p-6 shadow-xl space-y-4 max-w-sm w-full">
            <p className="font-semibold text-slate-900">Modifications non enregistrées</p>
            <p className="text-sm text-slate-600">
              Des modifications non enregistrées seront perdues. Quitter quand même ?
            </p>
            <div className="flex gap-3">
              <Button text="Quitter" color="danger" size="small" onClick={confirm} />
              <Button text="Rester" style="outline" color="secondary" size="small" onClick={cancel} />
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Nom</label>
            <Input {...register('nom', { required: 'Nom requis' })} />
            {errors.nom && <p className="text-xs text-red-600">{errors.nom.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">Prénom</label>
            <Input {...register('prenom', { required: 'Prénom requis' })} />
            {errors.prenom && <p className="text-xs text-red-600">{errors.prenom.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Adresse mail</label>
          <Input type="email" {...register('mail', { required: 'Mail requis' })} />
          {errors.mail && <p className="text-xs text-red-600">{errors.mail.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-900">Formation</label>
          <Input {...register('formation', { required: 'Formation requise' })} />
          {errors.formation && <p className="text-xs text-red-600">{errors.formation.message}</p>}
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            text={loading ? 'Enregistrement…' : 'Enregistrer'}
            disabled={loading}
          />
          <Button
            type="button"
            style="outline"
            color="secondary"
            text="Annuler"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </FormLayout>
  );
}

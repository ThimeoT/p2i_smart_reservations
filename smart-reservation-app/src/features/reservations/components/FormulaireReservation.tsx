import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import FormLayout from '../../../shared/components/form/FormLayout';
import { Input } from '../../../shared/components/form/Input';
import Textarea from '../../../shared/components/form/Textarea';
import Bouton from '../../../shared/components/Bouton';
import SectionSession, { type FormValues } from './SectionSession';
import type { ReservationRequest } from '../types/reservation.types';

function toApiDateTime(localValue: string): string {
  return localValue.length === 16 ? `${localValue}:00` : localValue;
}

interface Props {
  onSubmit: (data: ReservationRequest) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export default function FormulaireReservation({ onSubmit, loading, error }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { equipements } = useAllEquipements();

  const { register, control, handleSubmit, getValues, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      titre: '',
      description: '',
      sessions: [{ debut: '', fin: '', equipements: [{ equipementId: 0, quantite: 1 }] }],
    },
  });

  const { fields: sessionFields, append: appendSession, remove: removeSession } = useFieldArray({
    control,
    name: 'sessions',
  });

  const transform = (data: FormValues): ReservationRequest => ({
    utilisateurId: user!.id,
    titre: data.titre,
    description: data.description,
    statut: 'EN_ATTENTE',
    sessions: data.sessions.map((s) => ({
      quantitesEquipements: s.equipements.filter((e) => e.equipementId !== 0),
      debut: toApiDateTime(s.debut),
      fin: toApiDateTime(s.fin),
    })),
  });

  return (
    <FormLayout>
      <p className="text-sm text-slate-500">Décrivez votre besoin et ajoutez vos sessions.</p>

      {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <form onSubmit={handleSubmit((d) => onSubmit(transform(d)))} className="space-y-9">
        <div className="space-y-3">
          <label className="block text-xl font-semibold text-slate-900">Titre</label>
          <Input placeholder="Ex: Séance mocap lundi" {...register('titre', { required: 'Titre requis' })} />
          {errors.titre && <p className="text-xs text-red-600">{errors.titre.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-slate-900">Description</label>
          <Textarea placeholder="Contexte, objectifs…" {...register('description', { required: 'Description requise' })} />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-slate-900">Sessions</span>
            <Bouton
              type="button"
              style="filled"
              color="primary"
              size="small"
              text="Ajouter une session"
              onClick={() => appendSession({ debut: '', fin: '', equipements: [{ equipementId: 0, quantite: 1 }] })}
            />
          </div>

          {sessionFields.map((session, sIdx) => (
            <SectionSession
              key={session.id}
              sIdx={sIdx}
              control={control}
              register={register}
              errors={errors}
              getValues={getValues}
              equipements={equipements ?? []}
              onRemove={() => removeSession(sIdx)}
              canRemove={sessionFields.length > 1}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Bouton type="submit" text={loading ? 'Envoi…' : 'Soumettre la réservation'} disabled={loading} />
          <Bouton type="button" style="outline" color="secondary" text="Annuler" onClick={() => navigate(-1)} />
        </div>
      </form>
    </FormLayout>
  );
}

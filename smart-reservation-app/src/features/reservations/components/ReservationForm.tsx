import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import FormLayout from '../../../shared/components/form/FormLayout';
import { Input } from '../../../shared/components/form/Input';
import Textarea from '../../../shared/components/form/Textarea';
import Button from '../../../shared/components/Bouton';
import SectionSession, { type FormValues } from './SectionSession';
import type { ReservationRequest } from '../types/reservation.types';

function toApiDateTime(localValue: string): string {
  return localValue.length === 16 ? `${localValue}:00` : localValue;
}

interface Props {
  onSubmit: (data: ReservationRequest) => Promise<void>;
  loading?: boolean;
  error?: string;
  initialEquipementIds?: number[];
}

export default function ReservationForm({ onSubmit, loading, error, initialEquipementIds }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { equipements } = useAllEquipements();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      titre: '',
      description: '',
      equipements: initialEquipementIds && initialEquipementIds.length > 0
        ? initialEquipementIds.map((id) => ({ equipementId: id, quantite: 1 }))
        : [{ equipementId: 0, quantite: 1 }],
      sessions: [{ debut: '', fin: '' }],
    },
  });

  const {
    fields: eqFields,
    append: appendEq,
    remove: removeEq,
  } = useFieldArray({ control, name: 'equipements' });

  const {
    fields: sessionFields,
    append: appendSession,
    remove: removeSession,
  } = useFieldArray({ control, name: 'sessions' });

  const transform = (data: FormValues): ReservationRequest => ({
    utilisateurId: user!.id,
    titre: data.titre,
    description: data.description,
    statut: 'EN_ATTENTE',
    sessions: data.sessions.map((s) => ({
      quantitesEquipements: data.equipements.filter((e) => e.equipementId !== 0),
      debut: toApiDateTime(s.debut),
      fin: toApiDateTime(s.fin),
    })),
  });

  return (
    <FormLayout>
      <p className="text-sm text-slate-500">
        Sélectionnez vos équipements et ajoutez vos créneaux.
      </p>

      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <form onSubmit={handleSubmit((d) => onSubmit(transform(d)))} className="space-y-9">
        <div className="space-y-3">
          <label className="block text-xl font-semibold text-slate-900">Titre</label>
          <Input
            placeholder="Ex: Séance mocap lundi"
            {...register('titre', { required: 'Titre requis' })}
          />
          {errors.titre && <p className="text-xs text-red-600">{errors.titre.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-slate-900">Description</label>
          <Textarea
            placeholder="Contexte, objectifs…"
            {...register('description', { required: 'Description requise' })}
          />
          {errors.description && <p className="text-xs text-red-600">{errors.description.message}</p>}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-slate-900">Équipements</span>
            <Button
              type="button"
              style="filled"
              color="primary"
              size="small"
              text="+ Équipement"
              onClick={() => appendEq({ equipementId: 0, quantite: 1 })}
            />
          </div>
          <div className="space-y-2">
            {eqFields.map((eq, eIdx) => (
              <div key={eq.id} className="flex items-center gap-2">
                <select
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-bleu-2"
                  {...register(`equipements.${eIdx}.equipementId`, {
                    validate: (v) => Number(v) !== 0 || 'Choisir un équipement',
                  })}
                >
                  <option value={0}>Choisir un équipement…</option>
                  {equipements?.map((e) => (
                    <option key={e.id} value={e.id}>{e.nom}</option>
                  ))}
                </select>
                <Input
                  type="number"
                  min={1}
                  style={{ width: '5rem' }}
                  {...register(`equipements.${eIdx}.quantite`, { min: 1, valueAsNumber: true })}
                />
                {eqFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEq(eIdx)}
                    className="text-slate-400 transition hover:text-red-500"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-slate-900">Créneaux</span>
            <Button
              type="button"
              style="filled"
              color="primary"
              size="small"
              text="Ajouter un créneau"
              onClick={() => appendSession({ debut: '', fin: '' })}
            />
          </div>
          {sessionFields.map((session, sIdx) => (
            <SectionSession
              key={session.id}
              sIdx={sIdx}
              register={register}
              errors={errors}
              getValues={getValues}
              onRemove={() => removeSession(sIdx)}
              canRemove={sessionFields.length > 1}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            text={loading ? 'Envoi…' : 'Soumettre la réservation'}
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

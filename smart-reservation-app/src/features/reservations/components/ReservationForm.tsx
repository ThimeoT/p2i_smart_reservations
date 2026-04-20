import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import FormLayout from '../../../shared/components/form/FormLayout';
import { Input } from '../../../shared/components/form/Input';
import Textarea from '../../../shared/components/form/Textarea';
import Button from '../../../shared/components/Bouton';
import SectionSession, { type FormValues } from './SectionSession';
import type { ReservationRequest } from '../types/reservation.types';
import { useEffect } from 'react';

function toApiDateTime(localValue: string): string {
  return localValue.length === 16 ? `${localValue}:00` : localValue;
}

function defaultSession(heureDebut: number, heureFin: number, base?: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  const d = base ?? new Date();
  const date = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  return {
    debut: `${date}T${p(heureDebut)}:00`,
    fin: `${date}T${p(heureFin)}:00`,
  };
}

interface Props {
  onSubmit: (data: ReservationRequest) => Promise<void>;
  loading?: boolean;
  error?: string;
  initialEquipementIds?: number[];
  initialDate?: Date;
}

export default function ReservationForm({
  onSubmit,
  loading,
  error,
  initialEquipementIds,
  initialDate,
}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { equipements } = useAllEquipements();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      titre: '',
      description: '',
      equipements:
        initialEquipementIds && initialEquipementIds.length > 0
          ? initialEquipementIds.map((id) => ({
              equipementId: id,
              quantite: 1,
            }))
          : [{ equipementId: 0, quantite: 1 }],
      sessions: [defaultSession(8, 18, initialDate)],
    },
  });

  const watchedEquipements = useWatch({ control, name: 'equipements' });

  useEffect(() => {
    if (equipements && equipements.length > 0 && initialEquipementIds && initialEquipementIds.length > 0) {
      initialEquipementIds.forEach((id, idx) => {
        setValue(`equipements.${idx}.equipementId`, id);
      });
    }
  }, [equipements?.length]);

  const selectedIds = watchedEquipements
    .map((e) => Number(e.equipementId))
    .filter((id) => id !== 0);

  const warnings: string[] = [];
  for (const id of selectedIds) {
    const eq = equipements?.find((e) => e.id === id);
    if (!eq) continue;
    for (const relation of eq.relationsEquipement ?? []) {
      if (relation.statutRelationEquipement !== 'REQUIS') continue;
      for (const cible of relation.equipementsCible) {
        if (!selectedIds.includes(cible.id)) {
          warnings.push(`Le ${eq.nom} requiert 1*${cible.nom}`);
        }
      }
    }
  }

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
      quantitesEquipements: data.equipements.filter(
        (e) => e.equipementId !== 0,
      ),
      debut: toApiDateTime(s.debut),
      fin: toApiDateTime(s.fin),
    })),
  });

  return (
    <FormLayout>
      <p className="text-sm text-slate-500">
        Sélectionnez vos équipements et ajoutez vos créneaux.
      </p>

      <form
        onSubmit={handleSubmit((d) => onSubmit(transform(d)))}
        className="space-y-9"
      >
        <div className="space-y-3">
          <label className="block text-xl font-semibold text-slate-900">
            Titre
          </label>
          <Input
            placeholder="Ex: Séance mocap lundi"
            {...register('titre', { required: 'Titre requis' })}
          />
          {errors.titre && (
            <p className="text-xs text-red-600">{errors.titre.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-xl font-semibold text-slate-900">
            Description
          </label>
          <Textarea
            placeholder="Contexte, objectifs…"
            {...register('description', { required: 'Description requise' })}
          />
          {errors.description && (
            <p className="text-xs text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <span className="text-xl font-semibold text-slate-900">Équipements</span>
          {warnings.length > 0 && (
            <div className="space-y-1">
              {warnings.map((w, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-md border border-jaune-1 bg-jaune-1/10 px-3 py-2 text-sm text-slate-700"
                >
                  <span className="shrink-0">⚠</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}

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
                    <option key={e.id} value={e.id}>
                      {e.nom}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  min={1}
                  style={{ width: '5rem' }}
                  {...register(`equipements.${eIdx}.quantite`, {
                    min: 1,
                    valueAsNumber: true,
                  })}
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
          <Button
            type="button"
            style="filled"
            color="primary"
            size="small"
            text="Ajouter un équipement"
            onClick={() => appendEq({ equipementId: 0, quantite: 1 })}
          />
        </div>

        <div className="space-y-6">
          <span className="text-xl font-semibold text-slate-900">Créneaux</span>
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
          <Button
            type="button"
            style="filled"
            color="primary"
            size="small"
            text="Ajouter une session"
            onClick={() => appendSession(defaultSession(8, 18))}
          />
        </div>

        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

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

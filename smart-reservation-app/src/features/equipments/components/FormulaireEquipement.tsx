import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import type { Equipement, EquipementRequest } from '../types/equipement.types';
import type { StatutRelationEquipement } from '../types/relationEquipement.types';
import { useUnsavedChangesBlocker } from '../../../shared/hooks/useUnsavedChangesBlocker';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import useLabels from '../../label/hooks/useLabels';
import useAllEquipements from '../hooks/useAllEquipements';
import { Combobox } from '../../../shared/components/form/Combobox';
import FormLayout from '../../../shared/components/form/FormLayout';
import { Input } from '../../../shared/components/form/Input';
import Textarea from '../../../shared/components/form/Textarea';
import Button from '../../../shared/components/Button';

interface LienRessource {
  valeur: string;
}

interface EquipementFormValues extends Omit<
  EquipementRequest,
  'liensRessources'
> {
  liensRessources: LienRessource[];
}

function SectionLabels({
  control,
  labels,
}: {
  control: Control<EquipementFormValues>;
  labels: { id: number; nom: string; color: string }[];
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-900">Labels</label>
      <Controller
        control={control}
        name="labelsId"
        render={({ field }) => (
          <Combobox
            options={labels}
            value={field.value}
            onChange={field.onChange}
            placeholder="Ajouter un label..."
            renderTag={(opt) => (
              <span
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                style={{ borderColor: opt.color, borderWidth: 1 }}
              >
                {opt.nom}
              </span>
            )}
          />
        )}
      />
    </div>
  );
}

function SectionLiens({
  control,
  register,
  errors,
}: {
  control: Control<EquipementFormValues>;
  register: UseFormRegister<EquipementFormValues>;
  errors: FieldErrors<EquipementFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'liensRessources',
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-900">
          Liens ressources
        </span>
        <Button
          type="button"
          style="outline"
          color="secondary"
          text="Ajouter un lien"
          onClick={() => append({ valeur: '' })}
        />
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <Input
            type="url"
            placeholder="https://..."
            {...register(`liensRessources.${index}.valeur`, {
              required: 'URL requise',
            })}
          />
          {errors.liensRessources?.[index] && (
            <p className="text-sm text-rouge-2">
              {errors.liensRessources[index]?.message}
            </p>
          )}
          <Button
            type="button"
            style="outline"
            color="danger"
            text="Supprimer"
            onClick={() => remove(index)}
          />
        </div>
      ))}
    </div>
  );
}

function SectionRelations({
  control,
  register,
  errors,
  equipementCourantId,
  equipements,
}: {
  control: Control<EquipementFormValues>;
  register: UseFormRegister<EquipementFormValues>;
  errors: FieldErrors<EquipementFormValues>;
  equipementCourantId?: number;
  equipements: { id: number; nom: string }[];
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'relationsEquipement',
  });

  const STATUTS: StatutRelationEquipement[] = [
    'COMPATIBLE',
    'RECOMMANDE',
    'REQUIS',
  ];

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-900">
          Relations équipement
        </span>
        <Button
          type="button"
          style="outline"
          color="secondary"
          text="Ajouter une relation"
          onClick={() =>
            append({
              statutRelationEquipement: 'COMPATIBLE',
              equipementsCibleId: [],
              commentaire: '',
            })
          }
        />
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                Statut
              </label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-bleu-2"
                {...register(
                  `relationsEquipement.${index}.statutRelationEquipement`,
                  { required: 'Statut requis' },
                )}
              >
                {STATUTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                Commentaire
              </label>
              <Input
                type="text"
                placeholder="Commentaire"
                {...register(`relationsEquipement.${index}.commentaire`)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Équipements cibles
            </label>
            <Controller
              control={control}
              name={`relationsEquipement.${index}.equipementsCibleId`}
              rules={{
                validate: (v) =>
                  (v ?? []).length > 0 || 'Au moins un équipement cible requis',
              }}
              render={({ field: targetField }) => (
                <Combobox
                  options={equipements.filter(
                    (e) => e.id !== equipementCourantId,
                  )}
                  value={targetField.value ?? []}
                  onChange={targetField.onChange}
                  placeholder="Ajouter un équipement cible..."
                  renderTag={(opt) => (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                      {opt.nom}
                    </span>
                  )}
                />
              )}
            />
            {errors.relationsEquipement?.[index]?.equipementsCibleId && (
              <p className="text-sm text-rouge-2">
                {errors.relationsEquipement[index].equipementsCibleId.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              style="outline"
              color="danger"
              text="Supprimer"
              onClick={() => remove(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface FormulaireEquipementProps {
  onSubmit: (data: EquipementRequest) => Promise<void>;
  error?: string;
  loading?: boolean;
  equipement?: Equipement;
}

export default function FormulaireCreationEquipement({
  onSubmit,
  error,
  loading,
  equipement,
}: FormulaireEquipementProps) {
  const navigate = useNavigate();
  const { labels } = useLabels();
  const { equipements } = useAllEquipements();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<EquipementFormValues>({
    defaultValues: {
      nom: '',
      description: '',
      urlImage: '',
      labelsId: [],
      liensRessources: [],
      relationsEquipement: [],
    },
  });

  useEffect(() => {
    if (equipement)
      reset({
        nom: equipement.nom,
        description: equipement.description,
        urlImage: equipement.urlImage,
        labelsId: equipement.labels.map((label) => label.id),
        liensRessources: equipement.liensRessources.map((valeur) => ({
          valeur,
        })),
        relationsEquipement: equipement.relationsEquipement.map((relation) => ({
          id: relation.id,
          statutRelationEquipement: relation.statutRelationEquipement,
          equipementsCible: relation.equipementsCible.map(
            (equipement) => equipement.id,
          ),
          commentaire: relation.commentaire,
        })),
      });
  }, [equipement, reset]);

  const { isBlocked, confirm, cancel } = useUnsavedChangesBlocker(
    isDirty && !isSubmitSuccessful,
  );

  const handleSubmitTransform = (data: EquipementFormValues) => {
    return onSubmit({
      ...data,
      liensRessources: data.liensRessources.map((l) => l.valeur),
    });
  };

  return (
    <FormLayout>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Équipement</h1>
        <p className="text-sm text-slate-600">
          Remplissez les informations de l'équipement et enregistrez-les.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-rouge-100 p-3 text-sm text-rouge-700">
          {error}
        </p>
      )}
      {isBlocked && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <p>
            Les modifications non enregistrées seront perdues. Quitter quand
            même ?
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              text="Quitter"
              style="outline"
              color="danger"
              onClick={confirm}
            />
            <Button
              type="button"
              text="Rester"
              style="filled"
              color="secondary"
              onClick={cancel}
            />
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleSubmitTransform)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault(); // pour éviter de valider automatiquement avec entrée
        }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">
            Nom
          </label>
          <Input
            type="text"
            placeholder="Nom"
            {...register('nom', { required: 'Nom requis' })}
          />
          {errors.nom && (
            <p className="text-sm text-rouge-2">{errors.nom.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">
            Description
          </label>
          <Textarea
            placeholder="Description"
            {...register('description', { required: 'Description requise' })}
          />
          {errors.description && (
            <p className="text-sm text-rouge-2">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-900">
            URL de l'image
          </label>
          <Input
            type="url"
            placeholder="https://example.com/image.png"
            {...register('urlImage', { required: "URL de l'image requise" })}
          />
          {errors.urlImage && (
            <p className="text-sm text-rouge-2">{errors.urlImage.message}</p>
          )}
        </div>

        <SectionLabels control={control} labels={labels} />
        <SectionLiens control={control} register={register} errors={errors} />
        <SectionRelations
          control={control}
          register={register}
          errors={errors}
          equipementCourantId={equipement?.id}
          equipements={equipements}
        />

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            text={loading ? 'Enregistrement...' : 'Enregistrer'}
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

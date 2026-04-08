import {
  Controller,
  useFieldArray,
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form';
import type {
  Equipement,
  EquipementRequest,
  StatutRelationEquipement,
} from '../types/equipment.types';
import { useUnsavedChangesBlocker } from '../../../shared/hooks/useUnsavedChangesBlocker';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import useLabels from '../../label/hooks/useLabels';
import useAllEquipements from '../hooks/useAllEquipements';

interface LienRessource {
  valeur: string;
}

interface EquipementFormValues extends Omit<EquipementRequest, 'liensRessources'> {
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
    <fieldset>
      <legend>Labels</legend>
      <Controller
        control={control}
        name="labelsId"
        render={({ field }) => (
          <div>
            {labels.map((label) => (
              <button
                key={label.id}
                type="button"
                style={{ backgroundColor: label.color }}
                onClick={() =>
                  field.onChange(
                    field.value.includes(label.id)
                      ? field.value.filter((id: number) => id !== label.id)
                      : [...field.value, label.id],
                  )
                }
                aria-pressed={field.value.includes(label.id)}
              >
                {label.nom}
              </button>
            ))}
          </div>
        )}
      />
    </fieldset>
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
    <fieldset>
      <legend>Liens ressources</legend>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            type="url"
            placeholder="https://..."
            {...register(`liensRessources.${index}`, {
              required: 'URL requise',
            })}
          />
          {errors.liensRessources?.[index] && <p>URL requise</p>}
          <button type="button" onClick={() => remove(index)}>
            Supprimer
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({valeur:''})}>
        + Ajouter un lien
      </button>
    </fieldset>
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
    <fieldset>
      <legend>Relations équipement</legend>
      {fields.map((field, index) => (
        <div key={field.id}>
          <select
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

          <input
            type="text"
            placeholder="Commentaire"
            {...register(`relationsEquipement.${index}.commentaire`)}
          />

          <Controller
            control={control}
            name={`relationsEquipement.${index}.equipementsCibleId`}
            rules={{
              validate: (v) =>
                (v ?? []).length > 0 || 'Au moins un équipement cible requis',
            }}
            render={({ field }) => (
              <div>
                {equipements
                  .filter((e) => e.id !== equipementCourantId)
                  .map((e) => {
                    const value = field.value??[]
                    return(
                    
                    <label key={e.id}>
                      <input
                        type="checkbox"
                        checked={value.includes(e.id)}
                        onChange={() =>
                          field.onChange(
                            value.includes(e.id)
                              ? value.filter((id) => id !== e.id)
                              : [...value, e.id],
                          )
                        }
                      />
                      {e.nom}
                    </label>)
            })}
              </div>
            )}
          />
          {errors.relationsEquipement?.[index]?.equipementsCibleId && (
            <p>
              {errors.relationsEquipement[index].equipementsCibleId.message}
            </p>
          )}

          <button type="button" onClick={() => remove(index)}>
            Supprimer la relation
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            statutRelationEquipement: 'COMPATIBLE',
            equipementsCibleId: [],
            commentaire: '',
          })
        }
      >
        + Ajouter une relation
      </button>
    </fieldset>
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
        liensRessources: equipement.liensRessources.map((valeur) => ({ valeur })),
        relationsEquipement: equipement.relationsEquipement.map((r) => ({
          id: r.id,
          statutRelationEquipement: r.statutRelationEquipement,
          equipementsCibleId: r.equipementsCibleId,
          commentaire: r.commentaire,
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
        onSubmit={handleSubmit(handleSubmitTransform)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault(); // pour éviter de valider automatiquement avec entrée
        }}
      >
        <input
          type="text"
          placeholder={'Nom'}
          {...register('nom', { required: 'Nom requis' })}
        />
        {errors.nom && <p>{errors.nom.message}</p>}

        <textarea
          placeholder={'description'}
          {...register('description', { required: 'Description requise' })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <input
          type="url"
          placeholder="URL de l'image"
          {...register('urlImage', { required: "URL de l'image requise" })}
        />
        {errors.urlImage && <p>{errors.urlImage.message}</p>}

        <SectionLabels control={control} labels={labels} />
        <SectionLiens control={control} register={register} errors={errors} />
        <SectionRelations
          control={control}
          register={register}
          errors={errors}
          equipementCourantId={equipement?.id}
          equipements={equipements}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Annuler
        </button>
      </form>
    </>
  );  
}

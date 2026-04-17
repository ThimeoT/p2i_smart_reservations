import type {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Input } from '../../../shared/components/form/Input';
import Bouton from '../../../shared/components/Bouton';

export interface SessionFormValues {
  debut: string;
  fin: string;
  equipements: { equipementId: number; quantite: number }[];
}

export interface FormValues {
  titre: string;
  description: string;
  sessions: SessionFormValues[];
}

interface Props {
  sIdx: number;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  equipements: { id: number; nom: string }[];
  onRemove: () => void;
  canRemove: boolean;
}

export default function SectionSession({
  sIdx,
  control,
  register,
  errors,
  getValues,
  equipements,
  onRemove,
  canRemove,
}: Props) {
  const { fields: eqFields, append: appendEq, remove: removeEq } = useFieldArray({
    control,
    name: `sessions.${sIdx}.equipements`,
  });

  const sessionErrors = errors.sessions?.[sIdx];

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">Session {sIdx + 1}</span>
        {canRemove && (
          <Bouton type="button" style="filled" color="danger" size="small" text="Supprimer" onClick={onRemove} />
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">Début</label>
          <Input
            type="datetime-local"
            {...register(`sessions.${sIdx}.debut`, { required: 'Requis' })}
          />
          {sessionErrors?.debut && (
            <p className="text-xs text-red-600">{sessionErrors.debut.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-700">Fin</label>
          <Input
            type="datetime-local"
            {...register(`sessions.${sIdx}.fin`, {
              required: 'Requis',
              validate: (fin) => {
                const debut = getValues(`sessions.${sIdx}.debut`);
                if (debut && fin && fin <= debut) return 'La fin doit être après le début';
                return true;
              },
            })}
          />
          {sessionErrors?.fin && (
            <p className="text-xs text-red-600">{sessionErrors.fin.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-700">Équipements</span>
          <Bouton
            type="button"
            style="filled"
            color="primary"
            size="small"
            text="+ Équipement"
            onClick={() => appendEq({ equipementId: 0, quantite: 1 })}
          />
        </div>
        {eqFields.map((eq, eIdx) => (
          <div key={eq.id} className="flex items-center gap-2">
            <select
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-bleu-2"
              {...register(`sessions.${sIdx}.equipements.${eIdx}.equipementId`, {
                validate: (v) => Number(v) !== 0 || 'Choisir un équipement',
              })}
            >
              <option value={0}>Choisir un équipement…</option>
              {equipements.map((e) => (
                <option key={e.id} value={e.id}>{e.nom}</option>
              ))}
            </select>
            <Input
              type="number"
              min={1}
              style={{ width: '5rem' }}
              {...register(`sessions.${sIdx}.equipements.${eIdx}.quantite`, {
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
    </div>
  );
}

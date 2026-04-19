import type {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import { Input } from '../../../shared/components/form/Input';
import Button from '../../../shared/components/Bouton';

export interface SessionFormValues {
  debut: string;
  fin: string;
}

export interface FormValues {
  titre: string;
  description: string;
  equipements: { equipementId: number; quantite: number }[];
  sessions: SessionFormValues[];
}

interface Props {
  sIdx: number;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  onRemove: () => void;
  canRemove: boolean;
}

export default function SectionSession({
  sIdx,
  register,
  errors,
  getValues,
  onRemove,
  canRemove,
}: Props) {
  const sessionErrors = errors.sessions?.[sIdx];

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">
          Créneau {sIdx + 1}
        </span>
        {canRemove && (
          <Button
            type="button"
            style="filled"
            color="danger"
            size="small"
            text="Supprimer"
            onClick={onRemove}
          />
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
    </div>
  );
}

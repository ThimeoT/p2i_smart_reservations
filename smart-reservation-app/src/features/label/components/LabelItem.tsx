import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../shared/components/Bouton';
import LabelForm from './LabelForm';
import type { Label, LabelRequest } from '../types/label.types';

interface LabelItemProps {
  label: Label;
  onUpdate: (id: number, data: LabelRequest) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onSuccess: (message: string) => void;
}

export default function LabelItem({
  label,
  onUpdate,
  onDelete,
  onSuccess,
}: LabelItemProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'idle' | 'edit' | 'delete'>('idle');
  const [deleting, setDeleting] = useState(false);

  const handleUpdate = async (data: LabelRequest) => {
    await onUpdate(label.id, { ...data, id: label.id });
    setMode('idle');
    onSuccess('Label modifié avec succès');
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(label.id);
      onSuccess('Label supprimé avec succès');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-taupe-1 bg-white p-4">
        <button
          className="flex items-center gap-3 text-left hover:opacity-70 transition-opacity"
          onClick={() => navigate(`/labels/${label.id}`)}
        >
          <span
            className="h-4 w-4 flex-shrink-0 rounded-full"
            style={{ backgroundColor: label.color }}
          />
          <div>
            <p className="font-semibold text-bleu-fonce-1">{label.nom}</p>
            {label.description && (
              <p className="text-sm text-bleu-1">{label.description}</p>
            )}
          </div>
        </button>
        <div className="flex gap-2 ml-auto">
          <Button
            text="Modifier"
            size="small"
            style="outline"
            onClick={() => setMode(mode === 'edit' ? 'idle' : 'edit')}
          />
          <Button
            text="Supprimer"
            size="small"
            color="danger"
            style="outline"
            onClick={() => setMode(mode === 'delete' ? 'idle' : 'delete')}
          />
        </div>
      </div>

      {mode === 'edit' && (
        <LabelForm
          initial={label}
          onSubmit={handleUpdate}
          onCancel={() => setMode('idle')}
        />
      )}

      {mode === 'delete' && (
        <div className="rounded-xl border border-rouge-1 bg-red-50 p-4 space-y-3">
          <p className="font-semibold text-rouge-1 text-sm">
            Confirmer la suppression
          </p>
          <p className="text-sm text-slate-600">
            Supprimer <strong>{label.nom}</strong> retirera aussi ce label de
            tous les équipements qui le possèdent. Cette action est
            irréversible.
          </p>
          <div className="flex gap-3">
            <Button
              text={deleting ? 'Chargement...' : 'Confirmer la suppression'}
              size="small"
              color="danger"
              disabled={deleting}
              onClick={handleDelete}
            />
            <Button
              text="Annuler"
              size="small"
              style="outline"
              color="secondary"
              onClick={() => setMode('idle')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

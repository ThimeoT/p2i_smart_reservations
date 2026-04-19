import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../shared/components/Bouton';
import FormulaireExemplaire from './FormulaireExemplaire';
import type { Exemplaire, ExemplaireRequest, StatutDisponibilite } from '../types/exemplaire.types';

const STATUS_COLOR: Record<StatutDisponibilite, string> = {
  DISPONIBLE: 'text-vert-1',
  EMPRUNTE: 'text-jaune-1',
  MAINTENANCE: 'text-rouge-1',
  HORS_SERVICE: 'text-black',
};

const STATUS_LABEL: Record<StatutDisponibilite, string> = {
  DISPONIBLE: 'Disponible',
  EMPRUNTE: 'Emprunté',
  MAINTENANCE: 'Maintenance',
  HORS_SERVICE: 'Hors service',
};

interface ExemplaireAdminItemProps {
  exemplaire: Exemplaire;
  equipements: { id: number; nom: string }[];
  onUpdate: (id: number, data: ExemplaireRequest) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onSuccess: (message: string) => void;
}

export default function ExemplaireAdminItem({
  exemplaire,
  equipements,
  onUpdate,
  onDelete,
  onSuccess,
}: ExemplaireAdminItemProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'idle' | 'edit' | 'delete'>('idle');
  const [deleting, setDeleting] = useState(false);

  const handleUpdate = async (data: ExemplaireRequest) => {
    await onUpdate(exemplaire.id, data);
    setMode('idle');
    onSuccess('Exemplaire modifié avec succès');
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(exemplaire.id);
      onSuccess('Exemplaire supprimé avec succès');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-taupe-1 bg-white p-4">
        <button
          className="flex items-center gap-4 text-left hover:opacity-70 transition-opacity"
          onClick={() => navigate(`/exemplaires/${exemplaire.id}`)}
        >
          <div>
            <p className="font-semibold text-bleu-fonce-1">{exemplaire.nomSerie}</p>
            <p className="text-sm text-slate-500">{exemplaire.equipement.nom}</p>
            <p className={`text-xs font-medium ${STATUS_COLOR[exemplaire.statutDisponibilite]}`}>
              {STATUS_LABEL[exemplaire.statutDisponibilite]}
            </p>
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
        <FormulaireExemplaire
          initial={exemplaire}
          equipements={equipements}
          onSubmit={handleUpdate}
          onCancel={() => setMode('idle')}
        />
      )}

      {mode === 'delete' && (
        <div className="rounded-xl border border-rouge-1 bg-red-50 p-4 space-y-3">
          <p className="font-semibold text-rouge-1 text-sm">Confirmer la suppression</p>
          <p className="text-sm text-slate-600">
            Supprimer l'exemplaire <strong>{exemplaire.nomSerie}</strong> est irréversible.
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

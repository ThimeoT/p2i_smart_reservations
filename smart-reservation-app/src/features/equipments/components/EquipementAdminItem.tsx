import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../shared/components/Bouton';
import LabelCard from '../../../shared/components/cards/LabelCard';
import type { EquipementResume } from '../types/equipment.types';
import imageEquipement from '../../../assets/1080 1.png';

interface EquipementAdminItemProps {
  equipement: EquipementResume;
  onDelete: (id: number) => Promise<void>;
  onSuccess: (message: string) => void;
}

export default function EquipementAdminItem({ equipement, onDelete, onSuccess }: EquipementAdminItemProps) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(equipement.id);
      onSuccess('Équipement supprimé avec succès');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-taupe-1 bg-white p-4">
        <button
          className="flex items-center gap-4 text-left hover:opacity-70 transition-opacity"
          onClick={() => navigate(`/equipements/${equipement.id}`)}
        >
          <img
            src={equipement.urlImage ?? imageEquipement}
            className="h-12 w-12 object-contain shrink-0"
          />
          <div>
            <p className="font-semibold text-bleu-fonce-1">{equipement.nom}</p>
            {equipement.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {equipement.labels.map((label) => (
                  <LabelCard key={label.id} label={label} />
                ))}
              </div>
            )}
          </div>
        </button>
        <div className="flex gap-2 ml-auto">
          <Button
            text="Modifier"
            size="small"
            style="outline"
            onClick={() => navigate(`/admin/equipements/${equipement.id}/modifier`)}
          />
          <Button
            text="Supprimer"
            size="small"
            color="danger"
            style="outline"
            onClick={() => setShowConfirm(!showConfirm)}
          />
        </div>
      </div>

      {showConfirm && (
        <div className="rounded-xl border border-rouge-1 bg-red-50 p-4 space-y-3">
          <p className="font-semibold text-rouge-1 text-sm">Confirmer la suppression</p>
          <p className="text-sm text-slate-600">
            Supprimer <strong>{equipement.nom}</strong> est irréversible et retirera toutes ses données associées.
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
              onClick={() => setShowConfirm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

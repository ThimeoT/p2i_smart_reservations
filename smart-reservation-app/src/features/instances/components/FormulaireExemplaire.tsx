import { useState } from 'react';
import Input from '../../../shared/components/form/Input';
import Button from '../../../shared/components/Bouton';
import type { Exemplaire, ExemplaireRequest, StatutDisponibilite } from '../types/exemplaire.types';

const STATUTS: { value: StatutDisponibilite; label: string }[] = [
  { value: 'DISPONIBLE', label: 'Disponible' },
  { value: 'EMPRUNTE', label: 'Emprunté' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'HORS_SERVICE', label: 'Hors service' },
];

interface FormulaireExemplaireProps {
  initial: Exemplaire;
  equipements: { id: number; nom: string }[];
  onSubmit: (data: ExemplaireRequest) => Promise<void>;
  onCancel: () => void;
}

export default function FormulaireExemplaire({
  initial,
  equipements,
  onSubmit,
  onCancel,
}: FormulaireExemplaireProps) {
  const [nomSerie, setNomSerie] = useState(initial.nomSerie);
  const [statut, setStatut] = useState<StatutDisponibilite>(initial.statutDisponibilite);
  const [equipementId, setEquipementId] = useState(initial.equipement.id);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        id: initial.id,
        nomSerie: nomSerie as unknown as number,
        statutDisponibilite: statut,
        equipementId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <p className="font-display font-semibold text-sm">Modifier l'exemplaire</p>

      <div className="space-y-1">
        <label className="text-sm text-slate-600">Numéro de série</label>
        <Input
          placeholder="Numéro de série"
          value={nomSerie}
          onChange={(e) => setNomSerie(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-600">Statut</label>
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value as StatutDisponibilite)}
          className="w-full rounded-lg border-2 border-taupe-1 bg-white px-3 py-2 text-sm outline-none focus:border-bleu-fonce-1"
        >
          {STATUTS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-600">Équipement</label>
        <select
          value={equipementId}
          onChange={(e) => setEquipementId(Number(e.target.value))}
          className="w-full rounded-lg border-2 border-taupe-1 bg-white px-3 py-2 text-sm outline-none focus:border-bleu-fonce-1"
        >
          {equipements.map((e) => (
            <option key={e.id} value={e.id}>{e.nom}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <Button
          text={loading ? 'Chargement...' : 'Enregistrer'}
          type="submit"
          disabled={loading}
        />
        <Button text="Annuler" style="outline" color="secondary" onClick={onCancel} />
      </div>
    </form>
  );
}

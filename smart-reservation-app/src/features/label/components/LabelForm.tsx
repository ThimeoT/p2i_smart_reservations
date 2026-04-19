import { useState } from 'react';
import Input from '../../../shared/components/form/Input';
import Textarea from '../../../shared/components/form/Textarea';
import Button from '../../../shared/components/Bouton';
import type { Label, LabelRequest } from '../types/label.types';

interface LabelFormProps {
  initial?: Label;
  onSubmit: (data: LabelRequest) => Promise<void>;
  onCancel: () => void;
}

export default function LabelForm({
  initial,
  onSubmit,
  onCancel,
}: LabelFormProps) {
  const [nom, setNom] = useState(initial?.nom ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState(initial?.color ?? '#3B82F6');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ nom, description, color });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <p className="font-display font-semibold text-sm">
        {initial ? 'Modifier le label' : 'Nouveau label'}
      </p>
      <Input
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-600">Couleur</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-9 w-14 cursor-pointer rounded border border-taupe-1 bg-white p-1"
        />
        <span
          className="rounded-full border px-3 py-1 text-xs font-medium"
          style={{ borderColor: color, color }}
        >
          {nom || 'Aperçu'}
        </span>
      </div>
      <div className="flex gap-3">
        <Button
          text={loading ? 'Chargement...' : initial ? 'Enregistrer' : 'Créer'}
          type="submit"
          disabled={loading}
        />
        <Button
          text="Annuler"
          style="outline"
          color="secondary"
          onClick={onCancel}
        />
      </div>
    </form>
  );
}

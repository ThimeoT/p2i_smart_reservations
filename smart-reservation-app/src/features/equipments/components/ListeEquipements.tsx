import useAllEquipements from '../hooks/useAllEquipements';
import type { EquipementResume } from '../types/equipment.types';
import EquipmentCard from '../../../shared/components/cards/EquipmentCard';
import { useMemo, useState } from 'react';
import useLabels from '../../label/hooks/useLabels';
import Input from '../../../shared/components/form/Input';

export default function ListeEquipements() {
  const { equipements, loading, error } = useAllEquipements();
  const { labels } = useLabels();
  const [search, setSearch] = useState('');
  const [selectedLabels, setSelectedLabels] = useState<number[]>([]);

  const filtered = useMemo(() => {
    return equipements.filter((eq) => {
      const matchSearch = eq.nom.toLowerCase().includes(search.toLowerCase());
      const matchLabels =
        selectedLabels.length === 0 ||
        eq.labels.some((l) => selectedLabels.includes(l.id));
      return matchSearch && matchLabels;
    });
  }, [equipements, search, selectedLabels]);

  const toggleLabel = (id: number) =>
    setSelectedLabels((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );

  if (loading) return <p>Chargement des équipements...</p>;
  if (error)
    return (
      <p>
        {error.name} : {error.message}
      </p>
    );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Rechercher un équipement..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => {
            const isActive = selectedLabels.includes(label.id);
            return (
              <button
                key={label.id}
                onClick={() => toggleLabel(label.id)}
                className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                style={{
                  borderColor: label.color,
                  color: isActive ? 'white' : label.color,
                  backgroundColor: isActive ? label.color : 'transparent',
                }}
              >
                {label.nom}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {filtered.map((equipement: EquipementResume) => (
          <EquipmentCard key={equipement.id} equipement={equipement} />
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-slate-400">Aucun équipement trouvé.</p>
        )}
      </div>
    </div>
  );
}

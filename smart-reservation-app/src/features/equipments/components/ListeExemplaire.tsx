import { useState, useMemo } from 'react';
import ExemplaireAdminItem from '../../instances/components/ExemplaireAdminItem';
import useAllExemplaires from '../../instances/hooks/useAllExemplaires';
import useAllEquipements from '../hooks/useAllEquipements';
import { Combobox } from '../../../shared/components/form/Combobox';
import Toast from '../../../shared/components/Toast';
import type { Exemplaire, StatutDisponibilite } from '../../instances/types/exemplaire.types';
import ErrorCard from '../../../shared/components/cards/ErrorCard';

type DispoFilter = 'ALL' | StatutDisponibilite;

const DISPO_OPTIONS: { value: DispoFilter; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'DISPONIBLE', label: 'Disponible' },
  { value: 'EMPRUNTE', label: 'Emprunté' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'HORS_SERVICE', label: 'Hors service' },
];

export default function ListeExemplaire() {
  const { instances, loading, error, deleteExemplaire, updateExemplaire } = useAllExemplaires();
  const { equipements } = useAllEquipements();
  const [selectedEquipements, setSelectedEquipements] = useState<number[]>([]);
  const [dispoFilter, setDispoFilter] = useState<DispoFilter>('ALL');
  const [toastKey, setToastKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const equipementOptions = equipements.map((e) => ({ id: e.id, nom: e.nom }));

  const filtered = useMemo(() => {
    return instances.filter((instance: Exemplaire) => {
      const matchEquipement =
        selectedEquipements.length === 0 ||
        selectedEquipements.includes(instance.equipement.id);
      const matchDispo =
        dispoFilter === 'ALL' || instance.statutDisponibilite === dispoFilter;
      return matchEquipement && matchDispo;
    });
  }, [instances, selectedEquipements, dispoFilter]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastKey((k) => k + 1);
  };

  if (loading) return <p>Chargement des instances...</p>;
  if (error) return <ErrorCard error={error} />;

  return (
    <div className="flex flex-col gap-4">
      {toastMessage && <Toast key={toastKey} message={toastMessage} color="valid" />}

      <div className="flex flex-col gap-3">
        <Combobox
          options={equipementOptions}
          value={selectedEquipements}
          onChange={setSelectedEquipements}
          placeholder="Filtrer par équipement..."
        />
        <div className="flex flex-wrap gap-2">
          {DISPO_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setDispoFilter(value)}
              className={`rounded-full px-3 py-1 text-sm transition ${
                dispoFilter === value
                  ? 'bg-bleu-fonce-1 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500">Aucune instance trouvée.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((instance: Exemplaire) => (
            <ExemplaireAdminItem
              key={instance.id}
              exemplaire={instance}
              equipements={equipementOptions}
              onUpdate={updateExemplaire}
              onDelete={deleteExemplaire}
              onSuccess={showToast}
            />
          ))}
        </div>
      )}
    </div>
  );
}

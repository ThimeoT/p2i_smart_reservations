import useAllEquipements from '../hooks/useAllEquipements';
import type { EquipementResume } from '../types/equipement.types';
import CarteEquipement from '../../../shared/components/cards/CarteEquipement';

export default function ListeEquipements() {
  const { equipements, loading, error } = useAllEquipements();

  if (loading) return <p>Chargement des équipements...</p>;
  if (error)
    return (
      <p>
        {error.name} : {error.message}
      </p>
    );

  return (
    <div className="flex flex-wrap gap-4">
      {equipements.map((equipement: EquipementResume) => (
        <CarteEquipement equipement={equipement} />
      ))}
    </div>
  );
}

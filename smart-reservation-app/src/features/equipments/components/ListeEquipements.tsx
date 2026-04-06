import useAllEquipements from '../hooks/useAllEquipements';
import type { EquipementResume } from '../types/equipment.types';
import CarteEquipement from './CarteEquipement';

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
    <div>
      {equipements.map((equipement: EquipementResume) => (
        <CarteEquipement equipement={equipement} />
      ))}
    </div>
  );
}

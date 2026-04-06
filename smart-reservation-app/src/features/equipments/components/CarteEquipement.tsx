import { useNavigate } from 'react-router';
import type { EquipementResume } from '../types/equipment.types';

interface CarteEquipementProps {
  equipement : EquipementResume
}

export default function CarteEquipement({equipement}:CarteEquipementProps) {
  const navigate = useNavigate();
  return (
    <div>
      <h4>{equipement?.nom}</h4>
      <p> {equipement.labels.map((label) => `${label.nom} `)}</p>
      <button onClick={() => navigate(`/equipements/${equipement.id}`)}>
        Voir détail
      </button>
    </div>
  );
}

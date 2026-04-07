import { useNavigate } from 'react-router';
import type { EquipementResume } from '../types/equipment.types';

interface CarteEquipementProps {
  equipement : EquipementResume
}

export default function CarteEquipement({equipement}:CarteEquipementProps) {
  const navigate = useNavigate();
  const goToPageEquipement = ()=> navigate(`/equipements/${equipement.id}`);
  return (
    <div onClick={()=>goToPageEquipement()}>
      <h4>{equipement?.nom}</h4>
      <p> {equipement.labels.map((label) => `${label.nom} `)}</p>
      <button onClick={() => goToPageEquipement}>
        Voir détail
      </button>
    </div>
  );
}

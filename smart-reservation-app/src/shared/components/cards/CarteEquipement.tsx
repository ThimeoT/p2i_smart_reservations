import { useNavigate } from 'react-router';
import type { EquipementResume } from '../../../features/equipments/types/equipement.types';
import imageEquipement from '../../../assets/1080 1.png';

interface CarteEquipementProps {
  equipement: EquipementResume;
}

export default function CarteEquipement({ equipement }: CarteEquipementProps) {
  const navigate = useNavigate();
  const goToPageEquipement = () => navigate(`/equipements/${equipement.id}`);
  return (
    <div
      className="cursor-pointer w-sm p-4 border-2 border-solid border-taupe-1 rounded-lg flex items-center gap-4 relative "
      onClick={() => goToPageEquipement()}
    >
      <img
        className="w-16 h-16 object-contain"
        src={imageEquipement}
        height="25px"
      />
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{equipement?.nom}</div>
        <div className="text-sm text-gray-500">
          {equipement.labels.map((label) => `${label.nom} `)}
        </div>
      </div>
      <button
        className="absolute bottom-4 right-4 text-lg font-bold"
        onClick={() => goToPageEquipement}
      >
        {'>'}
      </button>
    </div>
  );
}

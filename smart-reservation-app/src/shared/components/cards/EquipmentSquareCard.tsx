import { useNavigate } from 'react-router';
import type { Equipement, EquipementResume } from '../../../features/equipments/types/equipment.types';
import imageEquipement from '../../../assets/image kit xsens awinda.png';

interface EquipementSquareCardProps {
  equipement: EquipementResume | Equipement;
}

export default function EquipementSquareCard({ equipement }: EquipementSquareCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="w-36 cursor-pointer rounded-2xl border border-taupe-1 p-3 flex flex-col items-center gap-2 hover:border-taupe-2 transition-colors"
      onClick={() => navigate(`/equipements/${equipement.id}`)}
    >
      <div className="flex h-24 w-full items-center justify-center">
        <img
          src={equipement.urlImage ?? imageEquipement}
          className="h-full w-full object-contain"
          alt={equipement.nom}
        />
      </div>
      <div className="w-full">
        <p className="truncate text-sm font-semibold text-slate-800">{equipement.nom}</p>
        {equipement.labels[0] && (
          <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-400">
            {equipement.labels[0].nom}
          </p>
        )}
      </div>
    </div>
  );
}

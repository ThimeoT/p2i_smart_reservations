import { useNavigate } from 'react-router';
import type {
  Instance,
  StatutDisponibilite,
} from '../../../features/instances/types/instance.types';

const getStatusColorClass = (statut: StatutDisponibilite) => {
  switch (statut) {
    case 'DISPONIBLE':
      return 'text-vert-1';
    case 'EMPRUNTE':
      return 'text-jaune-1';
    case 'HORS_SERVICE':
      return 'text-black';
    default:
      return 'text-rouge-1';
  }
};

interface InstanceCardProps {
  instance: Instance;
}

export default function InstanceCard({ instance }: InstanceCardProps) {
  const navigate = useNavigate();
  const gotoPageInstance = () => navigate(`/instances/${instance.id}`);
  return (
    <div
      onClick={() => gotoPageInstance()}
      className="w-64 flex flex-col justify-between p-4 rounded-md border-2 border-taupe-1 bg-transparent hover:cursor-pointer "
    >
      <div className="font-semibold">{instance.nomSerie}</div>
      <div
        className={`text-gray-600 text-mx font-bold ${getStatusColorClass(instance.statutDisponibilite)}`}
      >
        {instance.statutDisponibilite}
      </div>
    </div>
  );
}

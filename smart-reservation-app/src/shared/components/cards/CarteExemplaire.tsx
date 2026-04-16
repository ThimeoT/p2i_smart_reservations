import { useNavigate } from 'react-router';
import type {
  Exemplaire,
  StatutDisponibilite,
} from '../../../features/exemplaires/types/exemplaire.types';

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

interface CarteExemplaireProps {
  exemplaire: Exemplaire;
}

export default function CarteExemplaire({ exemplaire }: CarteExemplaireProps) {
  const navigate = useNavigate();
  const gotoPageExemplaire = () => navigate(`/exemplaires/${exemplaire.id}`);
  return (
    <div
      onClick={() => gotoPageExemplaire()}
      className="w-64 flex flex-col justify-between p-4 rounded-md border-2 border-taupe-1 bg-transparent hover:cursor-pointer "
    >
      <div className="font-semibold">{exemplaire.nomSerie}</div>
      <div
        className={`text-gray-600 text-mx font-bold ${getStatusColorClass(exemplaire.statutDisponibilite)}`}
      >
        {exemplaire.statutDisponibilite}
      </div>
    </div>
  );
}

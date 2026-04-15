import CarteExemplaire from '../../../shared/components/cards/CarteExemplaire';
import useAllExemplaires from '../../exemplaires/hooks/useExemplaires';
import type { Exemplaire } from '../../exemplaires/types/exemplaire.types';

export default function ListeExemplaires() {
  const { exemplaires, loading, error } = useAllExemplaires();

  if (loading) return <p>Chargement des équipements...</p>;
  if (error)
    return (
      <p>
        {error.name} : {error.message}
      </p>
    );

  return (
    <div className="flex flex-wrap gap-4">
      {exemplaires.map((exemplaire: Exemplaire) => (
        <CarteExemplaire exemplaire={exemplaire} />
      ))}
    </div>
  );
}

import { useParams } from 'react-router';
import { useInstance } from '../hooks/useExemplaire';
import TitrePage from '../../../shared/components/typography/TitrePage';
import EquipmentCard from '../../../shared/components/cards/EquipmentCard';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import ErrorCard from '../../../shared/components/cards/ErrorCard';

export default function PageInstance() {
  const { id } = useParams();
  const { instance, isLoading, error } = useInstance(parseInt(id ?? ''));
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <ErrorCard error={error} />;
  if (!instance) return null;
  return (
    <div>
      <TitrePage titre={instance.nomSerie} />
      <h2>Statut : {instance.statutDisponibilite}</h2>
      <SectionTitle title="Exemplaire de l'équipement" />
      <EquipmentCard equipement={instance.equipement} />
      <SectionTitle title="Créneaux Réservés" />
      <p>ici se trouve la liste des emprunts futurs</p>
    </div>
  );
}

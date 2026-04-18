import { useParams } from 'react-router';
import { useExemplaire } from '../hooks/useExemplaire';
import PageTitle from '../../../shared/components/typography/PageTitle';
import CarteEquipement from '../../../shared/components/cards/CarteEquipement';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import ErrorCard from '../../../shared/components/cards/CarteErreur';

export default function PageExemplaire() {
  const { id } = useParams();
  const { exemplaire, isLoading, error } = useExemplaire(parseInt(id ?? ''));
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <ErrorCard error={error} />;
  if (!exemplaire) return null;
  return (
    <div>
      <PageTitle titre={exemplaire.nomSerie} />
      <h2>Statut : {exemplaire.statutDisponibilite}</h2>
      <SectionTitle title="Exemplaire de l'équipement" />
      <CarteEquipement equipement={exemplaire.equipement} />
      <SectionTitle title="Créneaux Réservés" />
      <p>ici se trouve la liste des emprunts futurs</p>
    </div>
  );
}

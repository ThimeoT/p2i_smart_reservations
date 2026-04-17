import { useParams } from 'react-router';
import { useExemplaire } from '../hooks/useExemplaire';
import TitreDePage from '../../../shared/components/typography/TitlePage';
import CarteEquipement from '../../../shared/components/cards/CarteEquipement';
import TitreDeSection from '../../../shared/components/typography/TitleSection';
import CarteErreur from '../../../shared/components/cards/CarteErreur';

export default function PageExemplaire() {
  const { id } = useParams();
  const { exemplaire, isLoading, error } = useExemplaire(parseInt(id ?? ''));
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <CarteErreur error={error} />;
  if (!exemplaire) return null;
  return (
    <div>
      <TitreDePage titre={exemplaire.nomSerie} />
      <h2>Statut : {exemplaire.statutDisponibilite}</h2>
      <TitreDeSection titre="Exemplaire de l'équipement" />
      <CarteEquipement equipement={exemplaire.equipement} />
      <TitreDeSection titre="Créneaux Réservés" />
      <p>ici se trouve la liste des emprunts futurs</p>
    </div>
  );
}

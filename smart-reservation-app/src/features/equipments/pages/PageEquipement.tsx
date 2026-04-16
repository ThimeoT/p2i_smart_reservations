import { useEquipement } from '../hooks/useEquipement';
import photoEquipement from '../../../assets/image kit xsens awinda.png';
import CarteRelationEquipement from '../components/CarteRelationEquipement';
import { useParams } from 'react-router';
import CarteErreur from '../../../shared/components/cards/CarteErreur';
import TitreDePage from '../../../shared/components/typography/TitreDePage';
import TitreDeSection from '../../../shared/components/typography/TitreSection';
import CarteExemplaire from '../../../shared/components/cards/CarteExemplaire';

export default function PageEquipement() {
  const { id } = useParams();
  const { equipement, isLoading, error } = useEquipement(parseInt(id ?? ''));
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <CarteErreur error={error} />;
  if (!equipement) return null;

  console.log('Equipement', equipement);
  return (
    <>
      <TitreDePage titre={equipement.nom} />
      <img src={equipement.urlImage ?? photoEquipement} height={200} />
      <TitreDeSection titre="Description" />
      <p>{equipement.description}</p>
      <TitreDeSection titre="Exemplaires" />
      <div className="flex gap-4">
        {equipement.exemplaires.map((exemplaire) => (
          <CarteExemplaire exemplaire={exemplaire} />
        ))}
      </div>

      <TitreDeSection titre="Labels" />
      {equipement.labels.map((label) => (
        <p>{label.nom}</p>
      ))}
      <TitreDeSection titre="Equipements Requis" />
      {equipement.relationsEquipement
        .filter((relation) => relation.statutRelationEquipement === 'REQUIS')
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <TitreDeSection titre="Equipements Recommandes" />
      {equipement.relationsEquipement
        .filter(
          (relation) => relation.statutRelationEquipement === 'RECOMMANDE',
        )
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <TitreDeSection titre="Equipements Compatibles" />
      {equipement.relationsEquipement
        .filter(
          (relation) => relation.statutRelationEquipement === 'COMPATIBLE',
        )
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <button>Modifier l'équipement</button>
    </>
  );
}

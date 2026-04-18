import { useEquipement } from '../hooks/useEquipement';
import photoEquipement from '../../../assets/image kit xsens awinda.png';
import CarteRelationEquipement from '../components/CarteRelationEquipement';
import { useParams } from 'react-router';
import ErrorCard from '../../../shared/components/cards/ErrorCard';
import PageTitle from '../../../shared/components/typography/PageTitle';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import InstanceCard from '../../../shared/components/cards/InstanceCard';

export default function PageEquipement() {
  const { id } = useParams();
  const { equipement, isLoading, error } = useEquipement(parseInt(id ?? ''));
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <ErrorCard error={error} />;
  if (!equipement) return null;

  console.log('Equipement', equipement);
  return (
    <>
      <PageTitle title={equipement.nom} />
      <img src={equipement.urlImage ?? photoEquipement} height={200} />
      <SectionTitle title="Description" />
      <p>{equipement.description}</p>
      <SectionTitle title="Instances" />
      <div className="flex flex-wrap gap-4">
        {equipement.instances.map((instance) => (
          <InstanceCard instance={instance} />
        ))}
      </div>
      <SectionTitle title="Labels" />
      {equipement.labels.map((label) => (
        <p>{label.nom}</p>
      ))}
      <SectionTitle title="Equipements Requis" />
      {equipement.relationsEquipement
        .filter((relation) => relation.statutRelationEquipement === 'REQUIS')
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <SectionTitle title="Equipements Recommandes" />
      {equipement.relationsEquipement
        .filter(
          (relation) => relation.statutRelationEquipement === 'RECOMMANDE',
        )
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <SectionTitle title="Equipements Compatibles" />
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

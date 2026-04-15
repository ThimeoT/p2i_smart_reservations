import { useEquipement } from "../hooks/useEquipement";
import photoEquipement from "../../../assets/image kit xsens awinda.png";
import CarteRelationEquipement from "../components/CarteRelationEquipement";
import { useParams } from "react-router";
import CarteErreur from "../../../shared/components/cards/CarteErreur";

export default function PageEquipement() {
  const { id } = useParams();
  const { equipement, isLoading, error } = useEquipement(parseInt(id??""));
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <CarteErreur error={error}/>;
  if (!equipement) return null;

  console.log("Equipement", equipement);
  return (
    <>
      <img src={equipement.urlImage ?? photoEquipement} height={200} />
      <h1>{equipement.nom}</h1>
      <h3>Description</h3>
      <p>{equipement.description}</p>
      <h3>Exemplaires</h3>
      {equipement.exemplaires.map((exemplaire) => (
        <p>{exemplaire.nomSerie}</p>
      ))}
      <h3>Labels</h3>
      {equipement.labels.map((label) => (
        <p>{label.nom}</p>
      ))}
      <h3>Equipements Requis</h3>
      {equipement.relationsEquipement
        .filter((relation) => relation.statutRelationEquipement === "REQUIS")
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <h3>Equipements Recommandés</h3>
      {equipement.relationsEquipement
        .filter(
          (relation) => relation.statutRelationEquipement === "RECOMMANDE",
        )
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <h3>Equipements Compatibles</h3>
      {equipement.relationsEquipement
        .filter(
          (relation) => relation.statutRelationEquipement === "COMPATIBLE",
        )
        .map((relation, id) => {
          return <CarteRelationEquipement key={id} relation={relation} />;
        })}
      <button>Modifier l'équipement</button>
    </>
  );
}

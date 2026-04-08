import { Navigate, useParams } from 'react-router';
import { useEquipement } from '../hooks/useEquipement';
import photoEquipement from "../../../assets/image kit xsens awinda.png"

export default function EquipmentPage() {
  const { id } = useParams();
  const equipementId = id ? Number(id) : undefined;
  if (!equipementId) return <Navigate to="equipements" />;
  const { equipement, loading, error } = useEquipement(equipementId);
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;
  if (!equipement) return null;

  return (
    <>
      <img src={equipement.urlImage ?? photoEquipement} height={200}/>
      <h1>{equipement.nom}</h1>
      <h3>Description</h3>
      <p>{equipement.description}</p>
      <h3>Exemplaires</h3>
      {equipement.exemplaires.map(exemplaire => <p>{exemplaire.nomSerie}</p>)}
      <h3>Labels</h3>
      {equipement.labels.map(label => <p>{label.nom}</p>)}
      <button>Modifier l'équipement</button>
    </>
  );
}

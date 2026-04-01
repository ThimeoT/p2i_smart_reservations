import { Navigate, useNavigate } from "react-router"

export default function EquipmentPage()
{
  const navigate = useNavigate()
  return(
    <>
      <h1>Utilisateurs</h1>
      <br/>
      <h1>Equipements</h1>
      <br/>
      <h1>Exemplaires</h1>
      <br/>
      
      <button onClick={() => navigate("/equipments/add-equipment")}>ajouter un équipement</button>
      <br/>
      <h2>liste des Equipements</h2>

    </>
  )
}
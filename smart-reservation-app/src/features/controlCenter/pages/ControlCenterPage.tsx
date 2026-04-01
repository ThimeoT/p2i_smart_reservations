import { useNavigate } from "react-router"


export default function ControlCenter()
{
  const navigate = useNavigate();
  return(
    <>
      <h1>Centre de Contrôle</h1>
      <br/>
      <h2>Utilisateurs</h2>
    </>
  )
}
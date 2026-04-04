import { useNavigate } from "react-router"

export default function NotFoundPage(){
  
  const navigate = useNavigate();

  return(
    <>
    <h1>Page introuvable</h1>
    <p>Désolé, cette page n'a pas été trouvée ou n'existe pas... Voulez vous revenir à l'accueil ?</p>
    <button>Revenir à l'accueil</button>
    </>
  )
}
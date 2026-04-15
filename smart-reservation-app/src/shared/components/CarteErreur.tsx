import { useNavigate } from "react-router";

interface CarteErreurProps {
    error: Error
}

export default function CarteErreur({error} : CarteErreurProps) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Erreur ({error.message})</h1>
      <h2></h2>
      <p>{error.stack}</p>
      <button onClick={() => navigate(-1)}>Revenir à la page précédente</button>
    </div>
  );
}

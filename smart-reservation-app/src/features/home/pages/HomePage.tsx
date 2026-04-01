import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';

export default function HomePage() {
  const user = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <h1>Accueil</h1>
      <h3>Salut Thiméo 👋</h3>
      <h2>Centre de contrôle</h2>
      <button onClick={()=>navigate("/app/admin")}>Accéder au centre de contrôle</button>
      <h2>Mon Profil</h2>
      <button>Gérer mon profil</button>
    </>
  );
}

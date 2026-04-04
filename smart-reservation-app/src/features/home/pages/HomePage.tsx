import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Accueil</h1>
      <h3>Salut Thiméo 👋</h3>
      <h2>Centre de contrôle</h2>
      <button onClick={()=>navigate("/admin")}>Accéder au centre de contrôle</button>
      <h2>Mon Profil</h2>
      <button onClick={ ()=> navigate("/profile")}>Gérer mon profil</button>
    </>
  );
}

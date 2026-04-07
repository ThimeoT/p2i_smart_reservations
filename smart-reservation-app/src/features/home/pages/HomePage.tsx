import { useNavigate } from "react-router";
import { useIsAdmin } from "../../auth/hooks/useIsAdmin";
import { useUser } from "../../users/hooks/useUser";

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { currentUser } = useUser();
  return (
    <div>
      <h1>Accueil</h1>
      <h3>Salut {currentUser?.prenom} 👋</h3>

      {isAdmin && (
        <div>
          <h2>Centre de contrôle</h2>
          <button onClick={() => navigate("/admin")}>
            Accéder au centre de contrôle
          </button>
        </div>
      )}
      <h2>Catalogue</h2>
      <button onClick={() => navigate("/equipements")}>
        Accéder au catalogue
      </button>
      <h2>Mon Profil</h2>
      <button onClick={() => navigate("/profile")}>Gérer mon profil</button>
    </div>
  );
}

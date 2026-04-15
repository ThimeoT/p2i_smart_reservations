import { useNavigate } from "react-router";
import { useIsAdmin } from "../../auth/hooks/useIsAdmin";
import { useUser } from "../../users/hooks/useUser";
import TitreDePage from "../../../shared/components/TitreDePage";
import TitreDeSection from "../../../shared/components/TitreSection";

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { currentUser } = useUser();
  return (
    <div>
        <TitreDePage titre="Accueil" />
        <section>
          <h3>Salut {currentUser?.prenom} 👋</h3>
        </section>

        {isAdmin && (
          <div>
            <TitreDeSection titre="Centre de contrôle" />
            <button className="font-sans" onClick={() => navigate("/admin")}>
              Accéder au centre de contrôle
            </button>
          </div>
        )}
        <TitreDeSection titre="Catalogue" />
        <button className="font-sans" onClick={() => navigate("/equipements")}>
          Accéder au catalogue
        </button>
        <TitreDeSection titre="Mon Profil" />
        <button className="font-sans" onClick={() => navigate("/profile")}>
          Gérer mon profil
        </button>
    </div>
  );
}

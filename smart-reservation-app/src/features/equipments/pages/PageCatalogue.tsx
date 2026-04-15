import { useNavigate } from "react-router";
import { useIsAdmin } from "../../auth/hooks/useIsAdmin";
import ListeEquipements from "../components/ListeEquipements";

export default function PageCatalogue() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  return (
    <div>
      <h1>Catalogue</h1>
      <div className="bg-red-500 text-white p-4 text-center">
        Tailwind fonctionne ✅
      </div>
      {isAdmin && (
        <div>
          <h3>Besoin d'ajouter un nouvel équipement ?</h3>
          <button onClick={() => navigate("/equipements/ajouter-equipement")}>
            Ajouter un nouvel équipement
          </button>
        </div>
      )}

      <h2>Liste des Equipements</h2>
      <ListeEquipements />
    </div>
  );
}

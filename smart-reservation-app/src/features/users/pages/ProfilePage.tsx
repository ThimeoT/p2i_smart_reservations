import { useNavigate, useParams } from "react-router";
import { useUser } from "../hooks/useUser";
import { useLocation } from "react-router";
import NotFoundPage from "../../../app/views/NotFoundPage";
import { useAuth } from "../../auth/hooks/useAuth";
import { deleteUserApi, resetPasswordApi } from "../api/user.api";

interface ProfilePageProps {
  isAdminView?: boolean;
}

export default function ProfilePage({ isAdminView = false }: ProfilePageProps) {
  const location = useLocation();
  const { id } = useParams();
  const { user: connectedUser } = useAuth();
  const saved: boolean = location.state?.saved === true;

  const targetId = isAdminView && id ? Number(id) : connectedUser?.id;
  const { currentUser, loading, error } = useUser(targetId);

  const navigate = useNavigate();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;
  if (!currentUser) return null;

  const isOwnProfile = currentUser.id === connectedUser?.id;

  const handleDeleteAccount = ()=>{
    await deleteUserApi
  }

  return (
    <>
      {saved && <p>Modifications Enregistrées !</p>}
      <h1>Profil</h1>
      <p>
        Nom Prénom : {currentUser.nom} {currentUser.prenom}
      </p>
      <p>Mail : {currentUser.mail}</p>
      <p>Formation : {currentUser.formation}</p>
      <p>
        Date d'expiration : {currentUser.dateExpiration.toLocaleDateString()}
      </p>
      <button onClick={() => navigate("/profile/edit")}>
        Editer le profil
      </button>
      {isAdminView && !isOwnProfile && (
        <>
          <button onClick={() => handleDeleteAccount(currentUser.id)}>
            Supprimer le compte
          </button>
          <button onClick={() => handleResetPassword(currentUser.id)}>
            Réinitialiser le mot de passe
          </button>
        </>
      )}
    </>
  );
}

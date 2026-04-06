import { useNavigate, useParams } from 'react-router';
import { useUser } from '../hooks/useUser';
import { useLocation } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';

interface ProfilePageProps {
  isAdminView?: boolean;
}

export default function ProfilePage({ isAdminView = false }: ProfilePageProps) {
  const location = useLocation();
  const { id } = useParams();
  const { user: connectedUser } = useAuth();
  const navigate = useNavigate();
  const saved: boolean = location.state?.saved === true;

  const targetId = isAdminView && id ? Number(id) : connectedUser?.id;
  const { currentUser, loading, error, deleteUser, resetPassword } =
    useUser(targetId);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;
  if (!currentUser) return null;

  const isOwnProfile = currentUser.id === connectedUser?.id;

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

      <button onClick={() => navigate('/profile/edit')}>
        Editer le profil
      </button>

      {isAdminView && !isOwnProfile && (
        <>
          <button onClick={() => deleteUser()}>
            Supprimer le compte
          </button>
          <button onClick={() => resetPassword()}>
            Réinitialiser le mot de passe
          </button>
        </>
      )}
    </>
  );
}

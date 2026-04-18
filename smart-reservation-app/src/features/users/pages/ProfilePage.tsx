import { useNavigate, useParams } from 'react-router';
import { useUser } from '../hooks/useUser';
import { useLocation } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import Bouton from '../../../shared/components/Button';
import PageTitle from '../../../shared/components/typography/PageTitle';
import SectionTitle from '../../../shared/components/typography/SectionTitle';

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
      <PageTitle title="Mon Profil" />

      <SectionTitle title="Nom" />
      <p className="">
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
          <Bouton
            color="danger"
            onClick={() => deleteUser()}
            text="Supprimer le compte"
          />
          <Bouton
            color="danger"
            onClick={() => resetPassword()}
            text="Réinitialiser le mot de passe"
          />
          <Bouton
            color="danger"
            onClick={() => {}}
            text="Changer la date d'expiration du compte"
          />
        </>
      )}
    </>
  );
}

import { useNavigate, useParams } from 'react-router';
import { useUser } from '../hooks/useUser';
import { useLocation } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import Button from '../../../shared/components/Bouton';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import TextBody from '../../../shared/components/typography/TextBody';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';

export default function ProfilePage() {
  const location = useLocation();
  const { id } = useParams();
  const { user: connectedUser } = useAuth();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const saved: boolean = location.state?.saved === true;

  const targetId = isAdmin && id ? Number(id) : connectedUser?.id;
  const { currentUser, loading, error, deleteUser, resetPassword } =
    useUser(targetId);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;
  if (!currentUser) return null;

  return (
    <>
      {saved && <p>Modifications Enregistrées !</p>}
      <TitrePage titre="Mon Profil" />

      <SectionTitle title="Nom" />
      <TextBody>Nom et prénom</TextBody>
      <TextBody>
        {currentUser.nom} {currentUser.prenom}
      </TextBody>
      <TextBody>Formation</TextBody>
      <TextBody>{currentUser.formation}</TextBody>
      <TextBody>Date d'expiration</TextBody>
      <TextBody>{currentUser.dateExpiration.toISOString()}</TextBody>
      <Button
        onClick={() => navigate('/profile/edit')}
        text="Editer le profil"
      />

      {isAdmin && (
        <>
          <Button
            color="danger"
            onClick={() => deleteUser()}
            text="Supprimer le compte"
          />
          <Button
            color="danger"
            onClick={() => resetPassword()}
            text="Réinitialiser le mot de passe"
          />
          <Button
            color="danger"
            onClick={() => {}}
            text="Changer la date d'expiration du compte"
          />
        </>
      )}
    </>
  );
}

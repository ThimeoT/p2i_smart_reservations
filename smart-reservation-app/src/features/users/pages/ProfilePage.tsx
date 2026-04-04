import { useNavigate } from 'react-router';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

export default function ProfilePage() {
  const location = useLocation();
  const saved: boolean = location.state?.saved === true;
  const { currentUser, loading, error } = useCurrentUser();
  const navigate = useNavigate();


  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;
  if (!currentUser) return null;

  

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
        Editer mon profil
      </button>
    </>
  );
}

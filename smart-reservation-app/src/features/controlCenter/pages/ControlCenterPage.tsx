import { useState } from 'react';
import InviteUserForm from '../../users/components/IinviteUserForm';
import ListeUtilisateurs from '../components/ListeUtilisateurs';
import TitreDeSection from '../../../shared/components/typography/TitreSection';
import { useNavigate } from 'react-router';
import Bouton from '../../../shared/components/Bouton';
import ListeReservations from '../components/ListeReservations';
import TitreDePage from '../../../shared/components/typography/TitreDePage';
import ListeExemplaires from '../../equipments/components/ListeExemplaires';

export default function ControlCenter() {
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(true);

  return (
    <>
      <TitreDePage titre="Centre de Contrôle" />

      <TitreDeSection titre="Utilisateurs" />
      <ListeUtilisateurs />
      <button onClick={() => setShowAddUserForm(true)}>
        Ajouter un utilisateur
      </button>
      {showAddUserForm && (
        <InviteUserForm onClose={() => setShowAddUserForm(false)} />
      )}
      <TitreDeSection titre="Équipements" />
      <Bouton
        text="Voir la liste des équipements"
        onClick={() => navigate('/equipements')}
      />
      <TitreDeSection titre="Exemplaires" />
      <ListeExemplaires />
      <TitreDeSection titre="Réservations" />
      <ListeReservations />
    </>
  );
}

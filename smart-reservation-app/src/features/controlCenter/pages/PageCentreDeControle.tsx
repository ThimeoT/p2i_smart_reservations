import { useState } from 'react';
import UserInvitationForm from '../../users/components/InvitationForm';
import ListeUtilisateurs from '../components/ListeUtilisateurs';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import { useNavigate } from 'react-router';
import Bouton from '../../../shared/components/Button';
import ListeReservations from '../components/ListeReservations';
import PageTitle from '../../../shared/components/typography/PageTitle';
import ListeExemplaires from '../../equipments/components/ListeExemplaires';

export default function PageCentreDeControle() {
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <PageTitle titre="Centre de Contrôle" />

      <SectionTitle title="Utilisateurs" />
      <ListeUtilisateurs />
      <Bouton
        onClick={() => setShowAddUserForm(true)}
        text="Ajouter un utilisateur"
      />
      {showAddUserForm && (
        <UserInvitationForm onClose={() => setShowAddUserForm(false)} />
      )}
      <SectionTitle title="Équipements" />
      <Bouton
        text="Voir la liste des équipements"
        onClick={() => navigate('/equipements')}
      />
      <SectionTitle title="Exemplaires" />
      <ListeExemplaires />
      <SectionTitle title="Réservations" />
      <ListeReservations />
    </div>
  );
}

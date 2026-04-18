import { useState } from 'react';
import UserInvitationForm from '../../users/components/InvitationForm';
import UserList from '../components/UserList';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import { useNavigate } from 'react-router';
import Button from '../../../shared/components/Button';
import ReservationList from '../components/ReservationList';
import PageTitle from '../../../shared/components/typography/PageTitle';
import InstanceList from '../../equipments/components/InstanceList';

export default function PageCentreDeControle() {
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <PageTitle title="Centre de Contrôle" />

      <SectionTitle title="Utilisateurs" />
      <UserList />
      <Button
        onClick={() => setShowAddUserForm(true)}
        text="Ajouter un utilisateur"
      />
      {showAddUserForm && (
        <UserInvitationForm onClose={() => setShowAddUserForm(false)} />
      )}
      <SectionTitle title="Équipements" />
      <Button
        text="Voir la liste des équipements"
        onClick={() => navigate('/equipements')}
      />
      <SectionTitle title="Exemplaires" />
      <InstanceList />
      <SectionTitle title="Réservations" />
      <ReservationList />
    </div>
  );
}

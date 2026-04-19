import { useState } from 'react';
import TitrePage from '../../../shared/components/typography/TitrePage';
import Button from '../../../shared/components/Bouton';
import UserInvitationForm from '../components/InvitationForm';
import UserList from '../../controlCenter/components/UserList';

export default function UsersAdminPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <TitrePage titre="Utilisateurs" />
      <Button text="Inviter un utilisateur" onClick={() => setShowForm(true)} />
      {showForm && <UserInvitationForm onClose={() => setShowForm(false)} />}
      <UserList />
    </div>
  );
}

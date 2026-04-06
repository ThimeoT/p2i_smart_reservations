import { useState } from 'react';
import InviteUserForm from '../../users/components/IinviteUserForm';
import UserList from '../components/UserList';

export default function ControlCenter() {
  const [showAddUserForm, setShowAddUserForm] = useState(true);

  return (
    <>
      <h1>Centre de Contrôle</h1>
      <br />
      
      <h2>Utilisateurs</h2>
      <UserList/>
      <button onClick={()=> setShowAddUserForm(true)}></button>
      {
        showAddUserForm &&  <InviteUserForm onClose={() => setShowAddUserForm(false)} />
      }
    </>
  );
}

import AddUserForm from '../components/AddUserForm';
import UserList from '../components/UserList';

export default function ControlCenter() {

  return (
    <>
      <h1>Centre de Contrôle</h1>
      <br />
      <h2>Utilisateurs</h2>
      <UserList/>
      <button onClick={()=> <AddUserForm/>}></button>
      <h2></h2>
    </>
  );
}

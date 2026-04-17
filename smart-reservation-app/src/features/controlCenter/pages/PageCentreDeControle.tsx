import { useState } from 'react';
import FormulaireInvitationUtilisateur from '../../users/components/FormulaireInvitationUtilisateur';
import ListeUtilisateurs from '../components/ListeUtilisateurs';
import TitreDeSection from '../../../shared/components/typography/TitleSection';
import { useNavigate } from 'react-router';
import Bouton from '../../../shared/components/Bouton';
import ListeReservations from '../components/ListeReservations';
import TitreDePage from '../../../shared/components/typography/TitlePage';
import ListeExemplaires from '../../equipments/components/ListeExemplaires';

export default function PageCentreDeControle() {
  const navigate = useNavigate();
  const [showAddUserForm, setShowAddUserForm] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <TitreDePage titre="Centre de Contrôle" />

      <TitreDeSection titre="Utilisateurs" />
      <ListeUtilisateurs />
      <Bouton
        onClick={() => setShowAddUserForm(true)}
        text="Ajouter un utilisateur"
      />
      {showAddUserForm && (
        <FormulaireInvitationUtilisateur
          onClose={() => setShowAddUserForm(false)}
        />
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
    </div>
  );
}

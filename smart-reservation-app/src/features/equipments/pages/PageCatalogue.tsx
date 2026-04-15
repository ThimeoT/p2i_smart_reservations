import { useNavigate } from 'react-router';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import ListeEquipements from '../components/ListeEquipements';
import TitreDePage from '../../../shared/components/typography/TitreDePage';
import Bouton from '../../../shared/components/Bouton';
import TitreDeSection from '../../../shared/components/typography/TitreSection';

export default function PageCatalogue() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  return (
    <div>
      <TitreDePage titre="Catalogue" />
      {isAdmin && (
        <div>
          <h3>Besoin d'ajouter un nouvel équipement ?</h3>
          <Bouton text="Ajouter un nouvel équipement" onClick={() => navigate('/equipements/ajouter-equipement')}/>
        </div>
      )}

      <TitreDeSection titre="Liste des Equipements"/>
      <ListeEquipements />
    </div>
  );
}

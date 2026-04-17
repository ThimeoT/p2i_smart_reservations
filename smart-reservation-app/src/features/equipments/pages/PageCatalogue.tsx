import { useNavigate } from 'react-router';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import ListeEquipements from '../components/ListeEquipements';
import TitreDePage from '../../../shared/components/typography/TitlePage';
import Bouton from '../../../shared/components/Bouton';
import TitreDeSection from '../../../shared/components/typography/TitleSection';

export default function PageCatalogue() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  return (
    <div>
      <TitreDePage titre="Catalogue" />
      {isAdmin && (
        <div>
          <div className="font-display text-xl py-4 ">
            Besoin d'ajouter un nouvel équipement ?
          </div>
          <Bouton
            text="Ajouter un nouvel équipement"
            onClick={() => navigate('/equipements/ajouter-equipement')}
          />
        </div>
      )}

      <TitreDeSection titre="Liste des Equipements" />
      <ListeEquipements />
    </div>
  );
}

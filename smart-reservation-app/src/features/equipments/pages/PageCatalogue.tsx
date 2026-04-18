import { useNavigate } from 'react-router';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import ListeEquipements from '../components/ListeEquipements';
import PageTitle from '../../../shared/components/typography/PageTitle';
import Bouton from '../../../shared/components/Button';
import SectionTitle from '../../../shared/components/typography/SectionTitle';

export default function PageCatalogue() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  return (
    <div>
      <PageTitle title="Catalogue" />
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

      <SectionTitle title="Liste des Equipements" />
      <ListeEquipements />
    </div>
  );
}

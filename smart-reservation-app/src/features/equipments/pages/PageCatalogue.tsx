import { useNavigate } from 'react-router';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import ListeEquipements from '../components/ListeEquipements';
import TitrePage from '../../../shared/components/typography/TitrePage';
import Button from '../../../shared/components/Bouton';
import SectionTitle from '../../../shared/components/typography/SectionTitle';

export default function CatalogPage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  return (
    <div>
      <TitrePage titre="Catalogue" />
      {isAdmin && (
        <div className="flex flex-col gap-4">
          <div className="font-display text-xl py-4 ">
            Besoin d'ajouter un nouvel équipement ?
          </div>
          <Button
            text="Ajouter un nouvel équipement"
            onClick={() => navigate('/equipements/ajouter-equipement')}
          />
        </div>
      )}

      <div className="mt-4 mb-2">
        <Button
          text="Voir les disponibilités des équipements"
          style="outline"
          color="secondary"
          onClick={() => navigate('/disponibilites')}
        />
      </div>

      <SectionTitle title="Liste des Equipements" />
      <ListeEquipements />
    </div>
  );
}

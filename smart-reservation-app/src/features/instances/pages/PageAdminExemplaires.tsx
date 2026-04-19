import { useNavigate } from 'react-router';
import TitrePage from '../../../shared/components/typography/TitrePage';
import Button from '../../../shared/components/Bouton';
import ListeExemplaire from '../../equipments/components/ListeExemplaire';

export default function PageAdminExemplaires() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <TitrePage titre="Exemplaires" />
      <div className="flex flex-col gap-2">
        <p className="font-display text-xl py-2">
          Besoin d'ajouter un nouvel exemplaire ?
        </p>
        <Button
          text="Ajouter un exemplaire"
          onClick={() => navigate('/admin/exemplaires/ajouter')}
        />
      </div>
      <ListeExemplaire />
    </div>
  );
}

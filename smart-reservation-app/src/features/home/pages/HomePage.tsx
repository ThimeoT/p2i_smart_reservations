import { useNavigate } from 'react-router';
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import { useUser } from '../../users/hooks/useUser';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import TextBody from '../../../shared/components/typography/TextBody';
import Button from '../../../shared/components/Bouton';
import EquipementSquareCard from '../../../shared/components/cards/EquipmentSquareCard';

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { currentUser } = useUser();
  const { equipements } = useAllEquipements();

  return (
    <div className="flex flex-col pb-12">
      <TitrePage titre={`Bienvenue ${currentUser?.prenom ?? ''} 👋`} />

      {/* Tutoriel */}
      <div className="flex flex-col gap-3 mb-2">
        <button
          className="flex items-start gap-3 text-left transition-opacity hover:underline"
          onClick={() => navigate('/aide')}
        >
          <QuestionMarkCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-taupe-2" />
          <TextBody color="taupe">
            Besoin d'aide ? On vous explique tout juste ici !
          </TextBody>
        </button>
      </div>

      {isAdmin && (
        <>
          <SectionTitle title="Centre de contrôle" />
          <div className="my-4 flex flex-wrap gap-3">
            <Button text="Utilisateurs"  onClick={() => navigate('/admin/users')} />
            <Button text="Équipements"  onClick={() => navigate('/admin/equipements')} />
            <Button text="Exemplaires"  onClick={() => navigate('/admin/exemplaires')} />
            <Button text="Réservations"  onClick={() => navigate('/admin/reservations')} />
            <Button text="Labels"  onClick={() => navigate('/admin/labels')} />
          </div>
        </>
      )}

      {/* Catalogue */}
      <div className="flex items-center justify-between">
        <SectionTitle title="Catalogue" />
        <Button
            text="Voir plus"
            size="small"
            onClick={() => navigate('/equipements')}
          />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-8 px-8">
        {equipements.slice(0, 6).map((e) => (
          <div key={e.id} className="shrink-0">
            <EquipementSquareCard equipement={e} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 py-2">
        <Button text="Voir le catalogue des équipements" onClick={() => navigate('/equipements')} />
        <Button
          text="Disponibilités"
          style="outline"
          color="secondary"
          onClick={() => navigate('/disponibilites')}
        />
      </div>

      {/* Mes Réservations */}
      <SectionTitle title="Mes Réservations" />
      <TextBody color="taupe">
        Vous n'avez aucune réservation de prévue pour le moment.
      </TextBody>
      <div className="flex flex-wrap mt-4 gap-4 ">
        <Button
          text="Créer une nouvelle réservation"
          onClick={() => navigate('/reservations/creer')}
        />
        <Button
          text="Consulter mes réservations"
          onClick={() => navigate('/reservations/mes-reservations')}
        />
      </div>

      {/* Mon Profil */}
      <SectionTitle title="Mon Profil" />
      <TextBody color="taupe">
        Consultez et modifiez vos informations personnelles.
      </TextBody>
      <div className="mt-4">
        <Button text="Gérer mon profil" onClick={() => navigate('/profile')} />
      </div>
      
    </div>
  );
}

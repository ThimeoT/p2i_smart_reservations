import { useNavigate } from 'react-router';
import {
  InformationCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import { useUser } from '../../users/hooks/useUser';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import PageTitle from '../../../shared/components/typography/PageTitle';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import TextBody from '../../../shared/components/typography/TextBody';
import Button from '../../../shared/components/Button';
import EquipmentCard from '../../../shared/components/cards/EquipmentCard';

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { currentUser } = useUser();
  const { equipements } = useAllEquipements();

  return (
    <div className="flex flex-col pb-12">
      <PageTitle title={`Bienvenue ${currentUser?.prenom ?? ''} 👋`} />

      {/* Notifications & tutoriel */}
      <div className="flex flex-col gap-3 mb-2">
        <button
          className="flex items-start gap-3 text-left transition-opacity hover:opacity-70"
          onClick={() => navigate('/notifications')}
        >
          <InformationCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-bleu-fonce-1" />
          <TextBody color="taupe">
            Vous avez des notifications non lues, cliquez ici pour les consulter
            !
          </TextBody>
        </button>
        <button
          className="flex items-start gap-3 text-left transition-opacity hover:opacity-70"
          onClick={() => navigate('/aide')}
        >
          <QuestionMarkCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-taupe-2" />
          <TextBody color="taupe">
            Nouveau sur la plateforme ? On vous explique tout juste ici !
          </TextBody>
        </button>
      </div>

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
            <EquipmentCard equipement={e} />
          </div>
        ))}
      </div>

      {/* Mes Réservations */}
      <SectionTitle title="Mes Réservations" />
      <TextBody color="taupe">
        Vous n'avez aucune réservation de prévue pour le moment.
      </TextBody>
      <div className="mt-4">
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

      {isAdmin && (
        <>
          <SectionTitle title="Centre de contrôle" />
          <TextBody color="taupe">
            Gérez les utilisateurs, équipements et réservations.
          </TextBody>
          <div className="mt-4">
            <Button
              text="Accéder au centre de contrôle"
              onClick={() => navigate('/admin')}
            />
          </div>
        </>
      )}
    </div>
  );
}

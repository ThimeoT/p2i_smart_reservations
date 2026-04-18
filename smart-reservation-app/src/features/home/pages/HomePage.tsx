import { useNavigate } from 'react-router';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import { useUser } from '../../users/hooks/useUser';
import PageTitle from '../../../shared/components/typography/PageTitle';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import Bouton from '../../../shared/components/Button';

interface HomeSectionCardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

function HomeSectionCard({
  title,
  description,
  buttonText,
  onClick,
}: HomeSectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center gap-4 border border-beige-1">
      <h3 className="font-display font-bold text-lg text-bleu-fonce-1">
        {title}
      </h3>
      <p className="text-sm text-taupe-2 flex-1">{description}</p>

      <Bouton onClick={onClick} text={buttonText} />
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { currentUser } = useUser();
  return (
    <div className="flex flex-col gap-8 pb-12">
      <PageTitle title="Accueil" />
      <section className="px-8 flex flex-col gap-1">
        <p className="text-base font-semibold font-display">
          Bon retour parmi nous, {currentUser?.prenom} 👋
        </p>
        <p className="text-sm text-taupe-2">
          Première visite ?{' '}
          <span
            className="text-bleu-2 underline cursor-pointer hover:text-bleu-1 transition-colors"
            onClick={() => navigate('/tuto')}
          >
            Consultez le tutoriel
          </span>
        </p>
      </section>
      <section className="max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          {isAdmin && (
            <HomeSectionCard
              title="Centre de contrôle"
              description="Gérez les utilisateurs, les équipements et les réservations de la plateforme."
              buttonText="Accéder"
              onClick={() => navigate('/admin')}
            />
          )}

          <HomeSectionCard
            title="Catalogue"
            description="Parcourez les équipements disponibles à la réservation."
            buttonText="Voir le catalogue"
            onClick={() => navigate('/equipements')}
          />

          <HomeSectionCard
            title="Mon Profil"
            description="Consultez et modifiez vos informations personnelles."
            buttonText="Gérer mon profil"
            onClick={() => navigate('/profile')}
          />

          <HomeSectionCard
            title="Réservations"
            description="Aucune réservation en cours. Créez-en une dès maintenant."
            buttonText="Créer une réservation"
            onClick={() => navigate('/reservations/creer')}
          />
        </div>
      </section>
    </div>
  );
}

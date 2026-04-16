import { useNavigate } from 'react-router';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import { useUser } from '../../users/hooks/useUser';
import TitreDePage from '../../../shared/components/typography/TitreDePage';
import TitreDeSection from '../../../shared/components/typography/TitreSection';
import Bouton from '../../../shared/components/Bouton';

export default function HomePage() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { currentUser } = useUser();
  return (
    <div className="flex flex-col gap-4">
      <TitreDePage titre="Accueil" />
      <section>
        <h3>Salut {currentUser?.prenom} 👋</h3>
      </section>

      {isAdmin && (
        <>
          <TitreDeSection titre="Centre de contrôle" />
          <Bouton
            onClick={() => navigate('/admin')}
            text="Accéder au centre de contrôle"
          />
        </>
      )}
      <TitreDeSection titre="Catalogue" />
      <Bouton
        onClick={() => navigate('/equipements')}
        text="Accéder au catalogue"
      />

      <TitreDeSection titre="Mon Profil" />
      <Bouton
        onClick={() => navigate('/profile')}
        text="Gérer mon profil"
      ></Bouton>
    </div>
  );
}

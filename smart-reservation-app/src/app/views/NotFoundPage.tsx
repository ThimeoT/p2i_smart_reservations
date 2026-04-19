import { useNavigate } from 'react-router';
import Button from '../../shared/components/Bouton';
import TitrePage from '../../shared/components/typography/TitrePage';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <TitrePage titre="404 Page Introuvable" />
      <p>Désolé, cette page n'existe pas (un jour peut-être ?)</p>
      <div className="py-12">
        <Button
          text="Revenir à l'accueil"
          onClick={() => {
            navigate('/home');
          }}
        />
      </div>
    </>
  );
}

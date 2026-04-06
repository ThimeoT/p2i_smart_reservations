import { useNavigate } from 'react-router';

export default function PageCatalogue() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Catalogue</h2>
      <button onClick={() => navigate('/equipements')}>
        Accéder au Catalogue
      </button>
    </div>
  );
}

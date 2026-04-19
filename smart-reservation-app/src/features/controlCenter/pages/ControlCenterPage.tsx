import { useNavigate } from 'react-router';
import TitrePage from '../../../shared/components/typography/TitrePage';
import Button from '../../../shared/components/Bouton';

const SECTIONS = [
  { label: 'Utilisateurs', path: '/admin/users' },
  { label: 'Équipements', path: '/admin/labels' },
  { label: 'Exemplaires', path: '/admin/exemplaires' },
  { label: 'Réservations', path: '/admin/reservations' },
  { label: 'Labels', path: '/admin/labels' },
];

export default function ControlCenterPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <TitrePage titre="Centre de Contrôle" />
      <div className="flex flex-wrap items-stretch  gap-3">
        {SECTIONS.map(({ label, path }) => (
          <Button
            key={path}
            text={label}
            style="filled"
            onClick={() => navigate(path)}
          />
        ))}
      </div>
    </div>
  );
}

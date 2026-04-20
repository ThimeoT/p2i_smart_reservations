import { useNavigate } from 'react-router';
import type { User } from '../../../features/users/types/user.types';

const STATUT_LABELS: Record<string, string> = {
  ACTIF: 'Actif',
  INVITE: 'Invité',
  EXPIRE: 'Expiré',
  DESACTIVE: 'Désactivé',
};

const STATUT_COLORS: Record<string, string> = {
  ACTIF: 'bg-green-100 text-green-800',
  INVITE: 'bg-blue-100 text-blue-700',
  EXPIRE: 'bg-orange-100 text-orange-700',
  DESACTIVE: 'bg-slate-100 text-slate-500',
};

interface Props {
  utilisateur: User;
}

export default function UserCard({ utilisateur }: Props) {
  const navigate = useNavigate();
  const initiales =
    `${utilisateur.prenom?.[0] ?? ''}${utilisateur.nom?.[0] ?? ''}`.toUpperCase();

  return (
    <div
      role="button"
      onClick={() => navigate(`/admin/users/${utilisateur.id}`)}
      className="flex cursor-pointer  items-center gap-4 rounded-xl border-2 border-taupe-1 bg-transparent p-4 transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bleu-1/15 text-sm font-semibold text-bleu-2">
        {initiales}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900">
          {utilisateur.prenom} {utilisateur.nom}
        </p>
        <p className="truncate text-xs text-slate-400">{utilisateur.mail}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs text-slate-500">{utilisateur.role}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUT_COLORS[utilisateur.statutUtilisateur] ?? 'bg-slate-100 text-slate-500'}`}
        >
          {STATUT_LABELS[utilisateur.statutUtilisateur] ??
            utilisateur.statutUtilisateur}
        </span>
      </div>
    </div>
  );
}

import { useAllUsers } from '../../users/hooks/useAllUsers';
import { useMemo, useState } from 'react';
import UserCard from '../../../shared/components/cards/UserCard';
import Input from '../../../shared/components/form/Input';

type SortField = 'nom' | 'dateExpiration';
type SortOrder = 'ascendant' | 'descendant';
type RoleFilter = 'ALL' | 'USER' | 'ADMIN';
type StatusFilter = 'ALL' | 'INVITE' | 'ACTIF' | 'EXPIRE' | 'DESACTIVE';

const ROLE_OPTIONS: { value: RoleFilter; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'USER', label: 'Utilisateur' },
  { value: 'ADMIN', label: 'Admin' },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'Tous' },
  { value: 'ACTIF', label: 'Actif' },
  { value: 'INVITE', label: 'Invité' },
  { value: 'EXPIRE', label: 'Expiré' },
  { value: 'DESACTIVE', label: 'Désactivé' },
];

export default function UserList() {
  const { users, loading, error } = useAllUsers();
  const [search, setSearch] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('nom');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascendant');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const nom = user.nom ?? '';
        const prenom = user.prenom ?? '';
        const matchSearch = `${nom} ${prenom}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchRole = roleFilter === 'ALL' || user.role === roleFilter;
        const matchStatus =
          statusFilter === 'ALL' || user.statutUtilisateur === statusFilter;
        return matchSearch && matchRole && matchStatus;
      })
      .sort((a, b) => {
        const modifier = sortOrder === 'ascendant' ? 1 : -1;
        if (sortField === 'nom') {
          if (!a.nom && !b.nom) return 0;
          if (!a.nom) return 1;
          if (!b.nom) return -1;
          return a.nom.localeCompare(b.nom) * modifier;
        }

        if (!a.dateExpiration && !b.dateExpiration) return 0;
        if (!a.dateExpiration) return 1;
        if (!b.dateExpiration) return -1;

        return (
          (a.dateExpiration.getTime() - b.dateExpiration.getTime()) * modifier
        );
      });
  }, [users, search, sortField, sortOrder, roleFilter, statusFilter]);

  if (loading) return <p>Chargement des utilisateurs en cours</p>;
  if (error) return <p>{error.name} : {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Rechercher par nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Rôle</span>
          <div className="flex gap-2">
            {ROLE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setRoleFilter(value)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  roleFilter === value
                    ? 'bg-bleu-fonce-1 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">État</span>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  statusFilter === value
                    ? 'bg-bleu-fonce-1 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tri</span>
          <select
            value={`${sortField},${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split(',');
              setSortField(field as SortField);
              setSortOrder(order as SortOrder);
            }}
            className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm transition focus:border-bleu-fonce-1 focus:outline-none"
          >
            <option value="nom,ascendant">Nom A → Z</option>
            <option value="nom,descendant">Nom Z → A</option>
            <option value="dateExpiration,descendant">Expiration récente</option>
            <option value="dateExpiration,ascendant">Expiration ancienne</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-slate-500">Aucun utilisateur trouvé.</p>
        ) : (
          filteredUsers.map((user) => (
            <UserCard key={user.id} utilisateur={user} />
          ))
        )}
      </div>
    </div>
  );
}

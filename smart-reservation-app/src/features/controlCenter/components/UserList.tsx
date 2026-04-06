import { useAllUsers } from '../../users/hooks/useAllUsers';
import UserCard from '../../../shared/components/UserCard';
import { useMemo, useState } from 'react';

type SortField = 'nom' | 'dateExpiration';
type SortOrder = 'ascendant' | 'descendant';
type RoleFilter = 'ALL' | 'USER' | 'ADMIN';
type StatusFilter = 'ALL' | 'INVITE' | 'ACTIF' | 'EXPIRE' | 'DESACTIVE';

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
        const matchStatus = statusFilter === 'ALL' || user.statutUtilisateur === statusFilter;
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
  if (error)
    return (
      <p>
        {error.name}:{error.message}
      </p>
    );

  return (
    <>
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
      >
        <option value="ALL">Tous les rôles</option>
        <option value="USER">Utilisateurs</option>
        <option value="ADMIN">Administrateurs</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
      >
        <option value="ALL">Tous les états</option>
        <option value="ACTIF">Actifs</option>
        <option value="INVITE">Invités</option>
        <option value="EXPIRE">Expirés</option>
        <option value="DESACTIVE">Désactivés</option>
      </select>
      <select
        value={`${sortField},${sortOrder}`}
        onChange={(e) => {
          const [field, order] = e.target.value.split(',');
          setSortField(field as SortField);
          setSortOrder(order as SortOrder);
        }}
      >
        <option value={['nom,ascendant']}>Nom Croissant</option>
        <option value={['nom,descendant']}>Nom Décroissant</option>
        <option value={['dateExpiration,descendant']}>
          Date d'expiration la plus récente
        </option>
        <option value={['dateExpiration,ascendant']}>
          Date d'expiration la plus ancienne
        </option>
      </select>

      {filteredUsers.length === 0 ? (
        <p>Aucun utilisateur trouvé</p>
      ) : (
        filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </>
  );
}

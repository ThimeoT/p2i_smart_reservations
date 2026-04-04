import type { User } from "../../features/users/types/user.types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <>
      <h3>
        {user.nom} {user.prenom}
      </h3>
      <p>{user.mail}</p> <p>{user.dateExpiration.toISOString()
        .slice(0, 10)}</p>
    </>
  );
}

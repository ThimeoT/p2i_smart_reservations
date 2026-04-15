import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type {
  InvitationRequest,
  InvitationResponse,
} from '../../auth/types/auth.types';
import { inviteUserApi } from '../../auth/api/auth.api';

export default function InviteUserForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ mail: string; role: string }>();

  const [invitation, setInvitation] = useState<InvitationResponse | null>(null);

  const onSubmit = async (data: InvitationRequest) => {
    try {
      const result = await inviteUserApi(data);
      setInvitation(result);
    } catch {
      setError('root', {
        message: "Erreur lors de la création de l'invitation",
      });
    }
  };

  if (invitation) {
    const sujet = encodeURIComponent('Votre accès Smart Reservation');
    const corps = encodeURIComponent(
      `Bonjour,\n\nVotre accès a été créé.\n\n` +
        `Mail : ${invitation.mail}\n` +
        `Mot de passe temporaire : ${invitation.motDePasseTemporaire}\n\n` +
        `Connectez-vous sur http://localhost:5173/login\n` +
        `Vous serez invité à compléter votre profil à la première connexion.\n\n` +
        `Cordialement`,
    );

    return (
      <>
        <h2>Invitation créée</h2>
        <p>
          Mail : <strong>{invitation.mail}</strong>
        </p>
        <p>
          Mot de passe temporaire :{' '}
          <strong>{invitation.motDePasseTemporaire}</strong>
        </p>
        <p>Ces informations ne seront plus affichées après fermeture.</p>
        <a href={`mailto:${invitation.mail}?subject=${sujet}&body=${corps}`}>
          Envoyer par mail
        </a>
        <button onClick={onClose}>Fermer</button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Ajouter un utilisateur</h2>

      <input
        type="email"
        placeholder="Adresse mail"
        {...register('mail', { required: 'Mail requis' })}
      />
      {errors.mail && <p>{errors.mail.message}</p>}

      <select {...register('role')}>
        <option value="USER">Utilisateur</option>
        <option value="ADMIN">Administrateur</option>
      </select>

      {errors.root && <p>{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Création...' : "Créer l'invitation"}
      </button>
      <button type="button" onClick={onClose}>
        Annuler
      </button>
    </form>
  );
}

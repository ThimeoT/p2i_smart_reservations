import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { useUser } from '../hooks/useUser';
import { useAuth } from '../../auth/hooks/useAuth';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';
import Bouton from '../../../shared/components/Bouton';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitre from '../../../shared/components/typography/SectionTitle';
import CarteErreur from '../../../shared/components/cards/ErrorCard';
import Toast from '../../../shared/components/Toast';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
        {label}
      </span>
      <span className="text-sm text-slate-800">{value || '—'}</span>
    </div>
  );
}

export default function ProfilePage() {
  const location = useLocation();
  const { id } = useParams();
  const { user: connectedUser } = useAuth();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();
  const saved: boolean = location.state?.saved === true;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [newDateExpiration, setNewDateExpiration] = useState('');
  const [dateLoading, setDateLoading] = useState(false);
  const [dateSaved, setDateSaved] = useState(false);
  const [dateError, setDateError] = useState<unknown>(null);

  const targetId = isAdmin && id ? Number(id) : connectedUser?.id;
  const {
    currentUser,
    loading,
    error,
    deleteUser,
    resetPassword,
    updateDateExpiration,
  } = useUser(targetId);

  const handleDateExpiration = async () => {
    if (!newDateExpiration) return;
    setDateLoading(true);
    setDateError(null);
    setDateSaved(false);
    try {
      await updateDateExpiration(newDateExpiration);
      setNewDateExpiration('');
      setDateSaved(true);
    } catch (e) {
      setDateError(e);
    } finally {
      setDateLoading(false);
    }
  };

  const editPath = isAdmin && id ? `/admin/users/${id}/edit` : '/profile/edit';
  const isOwnProfile = !id || connectedUser?.id === Number(id);

  if (loading) return <p>Chargement...</p>;
  if (error) return <CarteErreur error={error} />;
  if (!currentUser) return null;

  const initials =
    `${currentUser.nom?.[0] ?? ''}${currentUser.prenom?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="space-y-6 pb-12">
      {saved && (
        <Toast
          message="Modifications enregistrées avec succès."
          color="valid"
        />
      )}

      <TitrePage
        titre={
          isOwnProfile
            ? 'Mon Profil'
            : `${currentUser.nom} ${currentUser.prenom}`
        }
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-bleu-fonce-1 text-white text-xl font-bold select-none shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {currentUser.nom} {currentUser.prenom}
          </p>
          <p className="text-sm text-slate-500">{currentUser.mail}</p>
        </div>
      </div>

      <SectionTitre title="Informations" />
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        <InfoRow label="Formation" value={currentUser.formation} />
        <InfoRow label="Rôle" value={currentUser.role} />
        <InfoRow label="Statut" value={currentUser.statutUtilisateur} />
        <InfoRow
          label="Date d'expiration"
          value={new Date(currentUser.dateExpiration).toLocaleDateString(
            'fr-FR',
          )}
        />
      </div>
      { 
        <div className="flex gap-3">
          <Bouton
            text="Modifier le profil"
            onClick={() => navigate(editPath)}
          />
        </div>
      }

      {isAdmin && (
        <div className="flex flex-col gap-3 border-t border-taupe-1 pt-6">
          <SectionTitre title="Administration" />
          {dateSaved && (
            <Toast message="Date d'expiration mise à jour." color="valid" />
          )}
          {dateError !== null && <CarteErreur error={dateError} />}

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-700">
              Changer la date d'expiration
            </p>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={newDateExpiration}
                onChange={(e) => setNewDateExpiration(e.target.value)}
                className="rounded-md border-3 border-taupe-1 px-3 py-1 text-sm outline-none focus:border-bleu-2"
              />
              <Bouton
                text={dateLoading ? 'Enregistrement…' : 'Mettre à jour'}
                size="small"
                disabled={!newDateExpiration || dateLoading}
                onClick={handleDateExpiration}
              />
            </div>
          </div>

          {tempPassword && (
            <div className="rounded-xl border border-jaune-1 bg-jaune-1/10 p-4 space-y-1">
              <p className="text-sm font-semibold text-slate-800">Mot de passe temporaire généré</p>
              <p className="font-mono text-base text-slate-900 select-all">{tempPassword}</p>
              <p className="text-xs text-slate-500">Communiquez ce mot de passe à l'utilisateur. Il devra le changer à sa prochaine connexion.</p>
            </div>
          )}

          <div className="flex gap-3">
            <Bouton
              text={resetLoading ? 'Réinitialisation…' : 'Réinitialiser le mot de passe'}
              style="outline"
              color="danger"
              disabled={resetLoading}
              onClick={async () => {
                setResetLoading(true);
                setTempPassword(null);
                try {
                  const pwd = await resetPassword();
                  if (pwd) setTempPassword(pwd);
                } finally {
                  setResetLoading(false);
                }
              }}
            />
            <Bouton
              text="Supprimer le compte"
              style="outline"
              color="danger"
              onClick={() => setConfirmDelete(true)}
            />
          </div>

          {confirmDelete && (
            <div className="rounded-xl border border-rouge-1 bg-red-50 p-4 space-y-3">
              <p className="font-semibold text-rouge-1 text-sm">
                Confirmer la suppression
              </p>
              <p className="text-sm text-slate-600">
                Supprimer le compte de{' '}
                <strong>
                  {currentUser.nom} {currentUser.prenom}
                </strong>{' '}
                est irréversible.
              </p>
              <div className="flex gap-3">
                <Bouton
                  text="Confirmer la suppression"
                  size="small"
                  color="danger"
                  onClick={() => deleteUser()}
                />
                <Bouton
                  text="Annuler"
                  size="small"
                  style="outline"
                  color="secondary"
                  onClick={() => setConfirmDelete(false)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

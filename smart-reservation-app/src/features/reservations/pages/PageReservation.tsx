import { useState } from 'react';
import { useParams } from 'react-router';
import { useReservation } from '../hooks/useReservation';
import { useAuth } from '../../auth/hooks/useAuth';
import CarteErreur from '../../../shared/components/cards/CarteErreur';
import TitreDePage from '../../../shared/components/typography/TitlePage';
import TitreSection from '../../../shared/components/typography/TitleSection';
import Bouton from '../../../shared/components/Bouton';
import Textarea from '../../../shared/components/form/Textarea';

const STATUT_LABELS: Record<string, string> = {
  EN_ATTENTE: 'En attente',
  VALIDEE: 'Validée',
  REFUSEE: 'Refusée',
  SUPPRIMEE: 'Supprimée',
};

const STATUT_COLORS: Record<string, string> = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
  VALIDEE: 'bg-green-100 text-green-800',
  REFUSEE: 'bg-red-100 text-red-800',
  SUPPRIMEE: 'bg-slate-100 text-slate-600',
};

function formatDate(d: string): string {
  return new Date(d).toLocaleString('fr-FR');
}

export default function PageReservation() {
  const { id } = useParams();
  const { user } = useAuth();
  const {
    reservation,
    isLoading,
    error,
    supprimerReservation,
    validerReservation,
    refuserReservation,
  } = useReservation(Number(id));
  const [commentaire, setCommentaire] = useState('');

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <CarteErreur error={error} />;
  if (!reservation) return null;

  const isAdmin = user?.role === 'ADMIN';
  const peutAgir = isAdmin && reservation.statut === 'EN_ATTENTE';

  const handleValider = () => {
    validerReservation({ utilisateurId: user!.id, message: commentaire });
    setCommentaire('');
  };

  const handleRefuser = () => {
    refuserReservation({ utilisateurId: user!.id, message: commentaire });
    setCommentaire('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between">
        <TitreDePage titre={reservation.titre} />
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${STATUT_COLORS[reservation.statut] ?? 'bg-slate-100 text-slate-700'}`}
        >
          {STATUT_LABELS[reservation.statut] ?? reservation.statut}
        </span>
      </div>

      <TitreSection titre="Sessions" />
      <div className="space-y-3">
        {reservation.sessions.map((session) => (
          <div
            key={session.id}
            className="space-y-2 rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-600">
              Du <strong>{formatDate(session.debut)}</strong> au{' '}
              <strong>{formatDate(session.fin)}</strong>
            </p>
            {session.emprunts.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {session.emprunts.map((emprunt) => (
                  <span
                    key={emprunt.id}
                    className="rounded-full bg-bleu-1/10 px-3 py-1 text-xs text-bleu-2"
                  >
                    {emprunt.exemplaire.nomSerie}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {peutAgir && (
        <>
          <TitreSection titre="Traitement de la demande de réservation" />
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Textarea
              placeholder="Commentaire (optionnel)…"
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
            />
            <div className="flex gap-3">
              <Bouton text="Valider" color="primary" onClick={handleValider} />
              <Bouton
                text="Refuser"
                style="filled"
                color="danger"
                onClick={handleRefuser}
              />
            </div>
          </div>
        </>
      )}

      {reservation.historiques.length > 0 && (
        <>
          <TitreSection titre="Historique" />
          <div className="space-y-2">
            {reservation.historiques.map((h) => (
              <div
                key={h.id}
                className="rounded-lg border border-slate-100 bg-white p-3 text-sm text-slate-700"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{h.action}</span>
                  <span className="text-xs text-slate-400">
                    {formatDate(h.date)}
                  </span>
                </div>
                {h.commentaire && (
                  <p className="mt-1 text-slate-500">{h.commentaire}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {reservation.statut !== 'SUPPRIMEE' && (
        <Bouton
          style="filled"
          color="danger"
          text="Supprimer la réservation"
          onClick={() => supprimerReservation()}
        />
      )}
    </div>
  );
}

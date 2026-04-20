import { useNavigate } from 'react-router';
import {
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import TitrePage from '../../../shared/components/typography/TitrePage';
import Button from '../../../shared/components/Bouton';

const STEPS = [
  {
    icon: MagnifyingGlassIcon,
    label: 'Recherchez les créneaux disponibles',
    description:
      'Consultez le calendrier de disponibilités pour trouver un créneau libre sur les équipements dont vous avez besoin. Filtrez par équipement et naviguez de mois en mois pour trouver le bon moment.',
    action: { text: 'Voir les disponibilités', to: '/disponibilites' },
    color: 'bg-bleu-fonce-1',
  },
  {
    icon: ClipboardDocumentListIcon,
    label: 'Complétez votre demande de réservation',
    description:
      "Renseignez le titre, la description et les équipements souhaités. Ajoutez un ou plusieurs créneaux horaires. Des avertissements s'affichent si des équipements dépendants manquent.",
    action: { text: 'Créer une réservation', to: '/reservations/creer' },
    color: 'bg-jaune-1',
  },
  {
    icon: ClockIcon,
    label: 'Attendez la validation',
    description:
      "Votre demande est transmise aux administrateurs. Vous pouvez suivre son statut dans l'onglet Mes Réservations. Vous serez notifié dès qu'une décision est prise.",
    action: { text: 'Mes réservations', to: '/reservations/mes-reservations' },
    color: 'bg-taupe-2',
  },
  {
    icon: CheckCircleIcon,
    label: "C'est fait !",
    description:
      "Une fois validée, votre réservation est confirmée et les équipements vous sont attribués pour le créneau choisi. Retrouvez tous les détails dans la fiche de réservation.",
    action: null,
    color: 'bg-vert-1',
  },
];

export default function PageAide() {
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-8 pb-12">
      <div className="space-y-1">
        <TitrePage titre="Comment ça marche ?" />
        <p className="text-sm text-slate-500">
          Suivez ces quelques étapes pour effectuer votre première réservation.
        </p>
      </div>

      <ol className="relative space-y-0">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === STEPS.length - 1;
          return (
            <li key={i} className="relative flex gap-4">
              {/* Ligne verticale */}
              {!isLast && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200" />
              )}

              {/* Icône */}
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${step.color} text-white shadow`}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Contenu */}
              <div className={`pb-8 ${isLast ? '' : ''}`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-0.5">
                  Étape {i + 1}
                </p>
                <p className="font-semibold text-slate-900 mb-1">{step.label}</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
                {step.action && (
                  <div className="mt-3">
                    <Button
                      size="small"
                      text={step.action.text}
                      onClick={() => navigate(step.action!.to)}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="rounded-xl border border-taupe-1 bg-taupe-1/10 p-4 space-y-2">
        <p className="text-sm font-semibold text-slate-800">Une question ?</p>
        <p className="text-sm text-slate-500">
          Contactez un administrateur ou consultez votre profil pour vérifier vos
          informations d'accès.
        </p>
        <Button
          size="small"
          style="outline"
          color="secondary"
          text="Mon profil"
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
}

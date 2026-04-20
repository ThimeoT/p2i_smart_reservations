import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useInstance } from '../hooks/useExemplaire';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import EquipmentCard from '../../../shared/components/cards/EquipmentCard';
import ErrorCard from '../../../shared/components/cards/ErrorCard';
import type { Emprunt, StatutEmprunt } from '../../reservations/types/emprunt.types';

type Filtre = 'avenir' | 'passes';

const STATUT_CLASSES: Record<StatutEmprunt, string> = {
  PLANIFIE: 'bg-jaune-1 text-slate-800',
  EN_COURS: 'bg-vert-1 text-white',
  TERMINE: 'bg-slate-200 text-slate-600',
  ANNULE: 'bg-rouge-1 text-white',
};

const STATUT_LABELS: Record<StatutEmprunt, string> = {
  PLANIFIE: 'Planifié',
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  ANNULE: 'Annulé',
};

function EmpruntCard({ emprunt }: { emprunt: Emprunt }) {
  const navigate = useNavigate();
  const debut = new Date(emprunt.session.debut);
  const fin = new Date(emprunt.session.fin);
  const sameDay = debut.toDateString() === fin.toDateString();

  return (
    <button
      className="w-full text-left rounded-xl bg-white shadow p-4 space-y-2 transition-shadow hover:shadow-md"
      onClick={() => navigate(`/reservations/${emprunt.session.reservationId}`)}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUT_CLASSES[emprunt.statut]}`}>
          {STATUT_LABELS[emprunt.statut]}
        </span>
        <span className="text-xs text-slate-400">→ Voir la réservation</span>
      </div>
      <p className="text-sm font-medium text-slate-800">
        {debut.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        {!sameDay && ` → ${fin.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      </p>
      <p className="text-xs text-slate-500">
        {debut.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        {' → '}
        {fin.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </button>
  );
}

export default function PageInstance() {
  const { id } = useParams();
  const { instance, isLoading, error, emprunts, empruntsLoading } = useInstance(parseInt(id ?? ''));
  const [filtre, setFiltre] = useState<Filtre>('avenir');

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <ErrorCard error={error} />;
  if (!instance) return null;

  const now = new Date();
  const empruntsFiltrés = emprunts.filter((e: Emprunt) => {
    const fin = new Date(e.session.fin);
    const debut = new Date(e.session.debut);
    return filtre === 'avenir' ? fin >= now || debut >= now : fin < now;
  });

  return (
    <div className="space-y-6 pb-12">
      <TitrePage titre={instance.nomSerie} />

      <div className="rounded-xl bg-white shadow p-4 space-y-1">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">Statut</span>
        <p className="text-sm font-semibold text-slate-800">{instance.statutDisponibilite}</p>
      </div>

      <SectionTitle title="Équipement associé" />
      <EquipmentCard equipement={instance.equipement} />

      <SectionTitle title="Créneaux réservés" />

      <div className="flex gap-2">
        {(['avenir', 'passes'] as Filtre[]).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filtre === f
                ? 'bg-bleu-fonce-1 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-bleu-fonce-1'
            }`}
          >
            {f === 'avenir' ? 'À venir' : 'Passés'}
          </button>
        ))}
      </div>

      {empruntsLoading ? (
        <p className="text-sm text-slate-500">Chargement des créneaux...</p>
      ) : empruntsFiltrés.length === 0 ? (
        <p className="text-sm text-slate-500">
          {filtre === 'avenir' ? 'Aucun créneau à venir.' : 'Aucun créneau passé.'}
        </p>
      ) : (
        <div className="space-y-3">
          {empruntsFiltrés.map((e: Emprunt) => (
            <EmpruntCard key={e.id} emprunt={e} />
          ))}
        </div>
      )}
    </div>
  );
}

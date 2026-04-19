import { useState } from 'react';
import { useEquipement } from '../hooks/useEquipement';
import photoEquipement from '../../../assets/image kit xsens awinda.png';
import CarteRelationEquipement from '../components/CarteRelationEquipement';
import { useParams, useNavigate } from 'react-router';
import ErrorCard from '../../../shared/components/cards/ErrorCard';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import InstanceCard from '../../../shared/components/cards/CarteExemplaire';
import LabelCard from '../../../shared/components/cards/LabelCard';
import Button from '../../../shared/components/Bouton';
import { useIsAdmin } from '../../auth/hooks/useIsAdmin';

import type { StatutRelationEquipement } from '../types/relationEquipement.types';

const RELATION_LABELS: Record<StatutRelationEquipement, string> = {
  REQUIS: 'Équipements requis',
  RECOMMANDE: 'Équipements recommandés',
  COMPATIBLE: 'Équipements compatibles',
};

const RELATION_ORDER: StatutRelationEquipement[] = [
  'REQUIS',
  'RECOMMANDE',
  'COMPATIBLE',
];

export default function PageEquipement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const { equipement, isLoading, error, deleteEquipement } = useEquipement(parseInt(id ?? ''));
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <ErrorCard error={error} />;
  if (!equipement) return null;

  const handleDelete = async () => {
    setDeleting(true);
    deleteEquipement();
  };

  return (
    <div className="space-y-6 pb-12">
      <TitrePage titre={equipement.nom} />
      <img src={equipement.urlImage ?? photoEquipement} height={200} />

      {equipement.labels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {equipement.labels.map((label) => (
            <LabelCard key={label.id} label={label} />
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <Button
          text="Voir les disponibilités"
          onClick={() => navigate(`/disponibilites?equipementId=${equipement.id}`)}
        />
        <Button
          text="Réserver cet équipement"
          onClick={() => navigate('/reservations/creer', { state: { equipementId: equipement.id } })}
        />
      </div>

      {equipement.description && (
        <>
          <SectionTitle title="Description" />
          <p>{equipement.description}</p>
        </>
      )}

      {equipement.exemplaires.length > 0 && (
        <>
          <SectionTitle title="Exemplaires" />
          <div className="flex flex-wrap gap-4">
            {equipement.exemplaires.map((instance) => (
              <InstanceCard key={instance.id} instance={instance} />
            ))}
          </div>
        </>
      )}

      {RELATION_ORDER.map((statut) => {
        const relations = equipement.relationsEquipement.filter(
          (r) => r.statutRelationEquipement === statut,
        );
        if (relations.length === 0) return null;
        return (
          <div key={statut} className="space-y-3">
            <SectionTitle title={RELATION_LABELS[statut]} />
            <div className="flex flex-wrap gap-4">
              {relations.map((relation) => (
                <CarteRelationEquipement key={relation.id} relation={relation} />
              ))}
            </div>
          </div>
        );
      })}

      {equipement.liensRessources.length > 0 && (
        <>
          <SectionTitle title="Ressources" />
          <ul className="space-y-1">
            {equipement.liensRessources.map((lien, i) => (
              <li key={i}>
                <a
                  href={lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bleu-2 underline hover:opacity-70 text-sm"
                >
                  {lien}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {isAdmin && (
        <div className="flex flex-col gap-3 border-t border-taupe-1 pt-6">
          <SectionTitle title="Administration" />
          <div className="flex gap-3">
            <Button
              text="Modifier"
              style="outline"
              onClick={() => navigate(`/admin/equipements/${equipement.id}/modifier`)}
            />
            <Button
              text="Supprimer"
              style="outline"
              color="danger"
              onClick={() => setConfirmDelete(true)}
            />
          </div>

          {confirmDelete && (
            <div className="rounded-xl border border-rouge-1 bg-red-50 p-4 space-y-3">
              <p className="font-semibold text-rouge-1 text-sm">Confirmer la suppression</p>
              <p className="text-sm text-slate-600">
                Supprimer <strong>{equipement.nom}</strong> est irréversible et retirera toutes ses données associées.
              </p>
              <div className="flex gap-3">
                <Button
                  text={deleting ? 'Chargement...' : 'Confirmer la suppression'}
                  size="small"
                  color="danger"
                  disabled={deleting}
                  onClick={handleDelete}
                />
                <Button
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

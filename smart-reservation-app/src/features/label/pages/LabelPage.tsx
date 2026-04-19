import { useParams } from 'react-router';
import useLabel from '../hooks/useLabel';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import ErrorCard from '../../../shared/components/cards/ErrorCard';
import EquipmentCard from '../../../shared/components/cards/EquipmentCard';
import TextBody from '../../../shared/components/typography/TextBody';
import EquipementSquareCard from '../../../shared/components/cards/EquipmentSquareCard';

export default function LabelPage() {
  const { id } = useParams();
  const { label, loading, error } = useLabel(Number(id));
  const { equipements } = useAllEquipements();

  if (loading) return <p>Chargement...</p>;
  if (error) return <ErrorCard error={error} />;
  if (!label) return null;

  const labelEquipements = equipements.filter((eq) =>
    eq.labels.some((l) => l.id === label.id),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span
          className="h-4 w-4 flex-shrink-0 rounded-full"
          style={{ backgroundColor: label.color }}
        />
        <TitrePage titre={label.nom} />
      </div>

      {label.description && (
        <>
          <SectionTitle title="Description" />
          <TextBody>{label.description}</TextBody>
        </>
      )}

      {labelEquipements.length > 0 && (
        <>
          <SectionTitle title="Équipements associés" />
          <div className="flex flex-wrap gap-4">
            {labelEquipements.map((eq) => (
              <EquipmentCard key={eq.id} equipement={eq} />
            ))}
          </div>
        </>
      )}

      {labelEquipements.length === 0 && !loading && (
        <p className="text-sm text-slate-400">
          Aucun équipement associé à ce label.
        </p>
      )}
    </div>
  );
}

import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import type { EquipementRequest } from '../types/equipment.types';
import { createEquipementApi } from '../api/equipements.api';
import { useEquipement } from '../hooks/useEquipement';
import FormulaireCreationEquipement from '../components/FormulaireEquipement';
import TitrePage from '../../../shared/components/typography/TitrePage';
import ErrorCard from '../../../shared/components/cards/ErrorCard';

export default function EquipmentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const numericId = parseInt(id ?? '');

  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { equipement, isLoading, error, updateEquipement } = useEquipement(numericId);

  if (isEdit && isLoading) return <p>Chargement...</p>;
  if (isEdit && error) return <ErrorCard error={error} />;

  const handleSubmit = async (data: EquipementRequest) => {
    setSubmitLoading(true);
    setSubmitError(undefined);
    try {
      if (isEdit) {
        updateEquipement(data);
        navigate(`/equipements/${id}`);
      } else {
        await createEquipementApi(data);
        navigate('/equipements', { state: { saved: true } });
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : isEdit
            ? "Erreur lors de la mise à jour de l'équipement"
            : "Erreur lors de la création de l'équipement",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <TitrePage titre={isEdit ? `Modifier — ${equipement?.nom ?? ''}` : 'Ajouter un équipement'} />
      <FormulaireCreationEquipement
        equipement={isEdit ? equipement : undefined}
        onSubmit={handleSubmit}
        loading={submitLoading}
        error={submitError}
      />
    </div>
  );
}

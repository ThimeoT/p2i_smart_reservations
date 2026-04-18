import { useNavigate } from 'react-router';
import { useState } from 'react';
import type { EquipementRequest } from '../types/equipement.types';
import { createEquipementApi } from '../api/equipements.api';
import FormulaireCreationEquipement from '../components/FormulaireEquipement';
import PageTitle from '../../../shared/components/typography/PageTitle';

export default function PagFormulaireEquipement() {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const handleSubmit = async (data: EquipementRequest) => {
    setSubmitLoading(true);
    setSubmitError(undefined);
    try {
      await createEquipementApi(data);
      navigate('/equipements', { state: { saved: true } });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création de l'équipement",
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div>
      <PageTitle title="Ajouter un équipement" />
      <FormulaireCreationEquipement
        onSubmit={handleSubmit}
        loading={submitLoading}
        error={submitError}
      />
    </div>
  );
}

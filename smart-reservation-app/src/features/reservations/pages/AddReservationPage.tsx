import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createReservationApi } from '../api/reservations.api';
import FormulaireReservation from '../components/FormulaireReservation';
import PageTitle from '../../../shared/components/typography/PageTitle';
import type { ReservationRequest } from '../types/reservation.types';

export default function AddReservationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (data: ReservationRequest) => {
    setLoading(true);
    setError(undefined);
    try {
      const created = await createReservationApi(data);
      navigate(`/reservations/${created.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle title="Créer une réservation" />
      <FormulaireReservation
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}

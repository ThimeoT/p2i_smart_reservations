import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { createReservationApi } from '../api/reservations.api';
import { ApiError } from '../../../config/fetchClient';
import ReservationForm from '../components/ReservationForm';
import TitrePage from '../../../shared/components/typography/TitrePage';
import type { ReservationRequest } from '../types/reservation.types';

export default function AddReservationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEquipementIds: number[] =
    location.state?.equipementIds ??
    (location.state?.equipementId ? [location.state.equipementId] : []);
  const initialDate: Date | undefined = location.state?.selectedDay
    ? new Date(location.state.selectedDay)
    : undefined;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (data: ReservationRequest) => {
    setLoading(true);
    setError(undefined);
    try {
      const created = await createReservationApi(data);
      navigate(`/reservations/${created.id}`);
    } catch (e) {
      if (e instanceof ApiError && typeof e.body === 'string') {
        setError(e.body);
      } else {
        setError(e instanceof Error ? e.message : 'Erreur lors de la création');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <TitrePage titre="Créer une réservation" />
      <ReservationForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        initialEquipementIds={initialEquipementIds}
        initialDate={initialDate}
      />
    </div>
  );
}

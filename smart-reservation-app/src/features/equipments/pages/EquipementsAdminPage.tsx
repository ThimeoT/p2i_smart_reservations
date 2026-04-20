import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEquipements } from '../hooks/useEquipements';
import EquipementAdminItem from '../components/EquipementAdminItem';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import Bouton from '../../../shared/components/Bouton';
import Toast from '../../../shared/components/Toast';

export default function EquipementsAdminPage() {
  const navigate = useNavigate();
  const { equipements, isLoading, deleteEquipement } = useEquipements();
  const [toastKey, setToastKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast key={toastKey} message={toastMessage} color="valid" />}

      <TitrePage titre="Gestion des équipements" />

      <Bouton
        text="Ajouter un équipement"
        onClick={() => navigate('/equipements/ajouter-equipement')}
      />

      <SectionTitle title="Équipements existants" />

      {isLoading && <p>Chargement...</p>}

      <div className="space-y-3">
        {equipements.map((equipement) => (
          <EquipementAdminItem
            key={equipement.id}
            equipement={equipement}
            onDelete={deleteEquipement}
            onSuccess={showToast}
          />
        ))}
      </div>
    </div>
  );
}

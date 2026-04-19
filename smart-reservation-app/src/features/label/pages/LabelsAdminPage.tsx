import { useState } from 'react';
import useLabels from '../hooks/useLabels';
import LabelForm from '../components/LabelForm';
import LabelItem from '../components/LabelItem';
import TitrePage from '../../../shared/components/typography/TitrePage';
import SectionTitle from '../../../shared/components/typography/SectionTitle';
import Button from '../../../shared/components/Bouton';
import Toast from '../../../shared/components/Toast';
import type { LabelRequest } from '../types/label.types';

export default function LabelsAdminPage() {
  const { labels, loading, createLabel, updateLabel, deleteLabel } =
    useLabels();
  const [showForm, setShowForm] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCreate = async (data: LabelRequest) => {
    await createLabel(data);
    setShowForm(false);
    showToast('Label créé avec succès');
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <Toast key={toastKey} color="valid" message={toastMessage} />
      )}

      <TitrePage titre="Gestion des labels" />

      {showForm ? (
        <LabelForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <Button text="Ajouter un label" onClick={() => setShowForm(true)} />
      )}

      <SectionTitle title="Labels existants" />

      {loading && <p>Chargement...</p>}

      <div className="space-y-3">
        {labels.map((label) => (
          <LabelItem
            key={label.id}
            label={label}
            onUpdate={updateLabel}
            onDelete={deleteLabel}
            onSuccess={showToast}
          />
        ))}
      </div>
    </div>
  );
}

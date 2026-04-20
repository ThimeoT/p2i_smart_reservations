import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Combobox } from '../../../shared/components/form/Combobox';
import Button from '../../../shared/components/Bouton';
import CalendrierDisponibilites from '../components/CalendrierDisponibilites';
import TimelineJour from '../components/TimeLineJour';
import useDisponibilites from '../hooks/useDisponibilites';
import useAllEquipements from '../../equipments/hooks/useAllEquipements';
import useAllExemplaires from '../../instances/hooks/useAllExemplaires';
import TitrePage from '../../../shared/components/typography/TitrePage';

export default function PageDisponibilites() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialId = searchParams.get('equipementId');

  const { equipements } = useAllEquipements();
  const { instances: allExemplaires } = useAllExemplaires();

  const [selectedEquipements, setSelectedEquipements] = useState<number[]>(
    initialId ? [parseInt(initialId)] : [],
  );
  const [month, setMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);

  const { joursEtats, empruntsByEquipement, loading } = useDisponibilites(selectedEquipements, month, allExemplaires);

  const equipementOptions = equipements.map((e) => ({ id: e.id, nom: e.nom }));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <TitrePage titre="Disponibilités"/>
      <Combobox
        options={equipementOptions}
        value={selectedEquipements}
        onChange={setSelectedEquipements}
        placeholder="Sélectionner un équipement..."
      />

      {selectedEquipements.length === 0 ? (
        <p className="text-sm text-slate-500">Sélectionnez au moins un équipement pour voir les disponibilités.</p>
      ) : (
        <>
          {loading && <p className="text-sm text-slate-500">Chargement...</p>}

          <div className="flex justify-center">
            <CalendrierDisponibilites
            month={month}
            onMonthChange={(m) => { setMonth(m); setSelectedDay(undefined); }}
            joursEtats={joursEtats}
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />
          </div>

          {selectedDay && (
            <TimelineJour
              day={selectedDay}
              equipementIds={selectedEquipements}
              equipements={equipementOptions}
              empruntsByEquipement={empruntsByEquipement}
              allExemplaires={allExemplaires}
            />
          )}

          <Button
            text="Réserver ces équipements"
            onClick={() => navigate('/reservations/creer', { state: { equipementIds: selectedEquipements, selectedDay: selectedDay?.toISOString() } })}
          />
        </>
      )}
    </div>
  );
}

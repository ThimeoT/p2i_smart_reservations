import { useEquipement } from '../../features/equipments/hooks/useEquipement';
import Button from '../../shared/components/Bouton';
import EquipementSquareCard from '../../shared/components/cards/EquipmentSquareCard';

export default function PageTest() {
  const { equipement } = useEquipement(4);
  return (
    <div>
      <h1>Page de test</h1>
      <Button
        text="Participer"
        style="filled"
        color="primary"
        onClick={() => {}}
      />
      {equipement && <EquipementSquareCard equipement={equipement} />}
    </div>
  );
}

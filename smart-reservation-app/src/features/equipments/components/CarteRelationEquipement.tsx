import type { RelationEquipement } from '../types/relationEquipement.types';
import EquipmentCard from '../../../shared/components/cards/EquipmentCard';

interface CarteRelationEquipementProps {
  relation: RelationEquipement;
}

export default function CarteRelationEquipement({
  relation,
}: CarteRelationEquipementProps) {
  console.log('relation', relation);
  return (
    <div className="flex flex-col items-center gap-4 p-2 w-min rounded-2xl border-2 border-taupe-1">
      <div className="flex-col gap-4 ">
        {relation.equipementsCible.map((equipement, index) => (
          <EquipmentCard key={index} equipement={equipement} />
        ))}
      </div>
      <div className="flex-inital">{relation.commentaire}</div>
    </div>
  );
}

import type {RelationEquipement} from '../types/relationEquipement.types'
import CarteEquipement from './CarteEquipement'

interface CarteRelationEquipementProps{
  relation : RelationEquipement
}

export default function CarteRelationEquipement({relation} : CarteRelationEquipementProps){
  console.log("relation", relation)
  return (
    <div className="flex gap-4">
      <div className="flex-inital">{relation.statutRelationEquipement}</div>
      <div className="flex-col">
        {relation.equipementsCible.map((equipement,index) =><CarteEquipement key={index} equipement={equipement}/>)}
      </div>
      <div className="flex-inital">{relation.commentaire}</div>
    </div>
  )
}
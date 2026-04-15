import type { Exemplaire } from "../../../features/exemplaires/types/exemplaire.types";

interface CarteExemplaireProps{
  exemplaire:Exemplaire;
}

export default function CarteExemplaire({exemplaire} :CarteExemplaireProps){
  
  return(
    <div className="w-64 flex flex-col justify-between p-4 rounded-md border-2 border-taupe-1 bg-transparent">
      <div className="font-semibold">{exemplaire.nomSerie}</div>
      <div className="text-gray-600">{exemplaire.statutDisponibilite}</div>
      
    </div>
  )
}
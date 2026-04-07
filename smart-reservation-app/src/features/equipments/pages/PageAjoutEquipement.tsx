import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { EquipementRequest } from "../types/equipment.types";
import { createEquipementApi } from "../api/equipment.api";
import FormulaireCreationEquipement from "../components/FormulaireCreationEquipement";

export default function PageAjoutEquipement() {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (saved) (navigate("/equipements"), { state: { saved: true } });
  }, [saved]);

  const handleSubmit = async(data:EquipementRequest)=>
  {
    setSubmitLoading(true);
    setSubmitError(undefined);
    try {
      await createEquipementApi(data);
      setSaved(true);
    } catch(error){
      setSubmitError("Erreur lors de la création de l'équipement" + { error })
    } finally{
      setSubmitLoading(false);
    }
  }

  return(
    <div>
      <h1>Ajouter un équipement</h1>
    <FormulaireCreationEquipement onSubmit={handleSubmit} loading={submitLoading} error={submitError} />
    </div>
  )
}

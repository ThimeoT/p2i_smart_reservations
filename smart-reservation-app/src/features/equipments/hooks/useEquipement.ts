import { useNavigate } from "react-router";
import type { Equipement, EquipementRequest } from "../types/equipment.types";
import { useEffect, useState } from "react";
import { deleteEquipementApi, getEquipementByIdApi, updateEquipementApi } from "../api/equipment.api";

export function useEquipement( id:number) {

  const navigate=  useNavigate();

  const [equipement, setEquipement] = useState<Equipement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);


  useEffect(() => {
    if(!id) return;
    setLoading(true);
    getEquipementByIdApi(id)
      .then(setEquipement)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  const updateEquipement = async (data: EquipementRequest) => {
    if(!equipement) return;
    const updatedEquipement = await updateEquipementApi( equipement.id, data );
    setEquipement(updatedEquipement);
    return updatedEquipement;
  }

  const deleteEquipement = async () => {
    if(!equipement) return;
  await deleteEquipementApi(equipement.id);
  navigate('/admin');
};

  return { equipement, loading, error, updateEquipement, deleteEquipement };
}

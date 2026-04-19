import { useState, useEffect, useMemo } from 'react';
import { getEmpruntsByEquipementApi } from '../api/disponibilites.api';
import useAllExemplaires from '../../instances/hooks/useAllExemplaires';
import type { Emprunt } from '../../reservations/types/emprunt.types';
import type { EtatJour } from '../types/disponibilite.types';

function overlapsDay(emprunt: Emprunt, day: Date): boolean {
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0);
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59);
  const empStart = new Date(emprunt.session.debut);
  const empEnd = new Date(emprunt.session.fin);
  return empStart <= dayEnd && empEnd >= dayStart;
}

function getDaysInMonth(month: Date): Date[] {
  const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1));
}

function worstState(a: EtatJour, b: EtatJour): EtatJour {
  if (a === 'INDISPONIBLE' || b === 'INDISPONIBLE') return 'INDISPONIBLE';
  if (a === 'PARTIEL' || b === 'PARTIEL') return 'PARTIEL';
  return 'DISPONIBLE';
}

function toDateKey(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

export default function useDisponibilites(equipementIds: number[], month: Date) {
  const [empruntsByEquipement, setEmpruntsByEquipement] = useState<Record<number, Emprunt[]>>({});
  const [loading, setLoading] = useState(false);
  const { instances: allExemplaires } = useAllExemplaires();

  const monthYear = `${month.getFullYear()}-${month.getMonth()}`;
  const idsKey = equipementIds.join(',');

  useEffect(() => {
    if (equipementIds.length === 0) { setEmpruntsByEquipement({}); return; }
    const start = new Date(month.getFullYear(), month.getMonth(), 1, 0, 0, 0);
    const end = new Date(month.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59);
    setLoading(true);
    Promise.all(
      equipementIds.map((id) =>
        getEmpruntsByEquipementApi(id, start, end).then((emprunts) => ({ id, emprunts })),
      ),
    )
      .then((results) => {
        const map: Record<number, Emprunt[]> = {};
        results.forEach(({ id, emprunts }) => { map[id] = emprunts; });
        setEmpruntsByEquipement(map);
      })
      .finally(() => setLoading(false));
  }, [idsKey, monthYear]);

  const joursEtats = useMemo<Record<string, EtatJour>>(() => {
    if (equipementIds.length === 0) return {};
    return Object.fromEntries(
      getDaysInMonth(month).map((day) => {
        let combined: EtatJour = 'DISPONIBLE';
        for (const id of equipementIds) {
          const total = allExemplaires.filter((ex) => ex.equipement.id === id).length;
          if (total === 0) continue;
          const occupied = new Set(
            (empruntsByEquipement[id] ?? [])
              .filter((e) => e.statut !== 'ANNULE' && e.statut !== 'TERMINE' && overlapsDay(e, day))
              .map((e) => e.exemplaire.id),
          ).size;
          const etat: EtatJour = occupied >= total ? 'INDISPONIBLE' : occupied > 0 ? 'PARTIEL' : 'DISPONIBLE';
          combined = worstState(combined, etat);
        }
        return [toDateKey(day), combined];
      }),
    );
  }, [equipementIds, month, empruntsByEquipement, allExemplaires]);

  return { joursEtats, empruntsByEquipement, loading };
}

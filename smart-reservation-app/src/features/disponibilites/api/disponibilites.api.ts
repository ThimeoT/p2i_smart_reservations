import fetchClient from '../../../config/fetchClient';
import type { Emprunt } from '../../reservations/types/emprunt.types';

function formatLocalDateTime(date: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}T${p(date.getHours())}:${p(date.getMinutes())}:${p(date.getSeconds())}`;
}

export async function getEmpruntsByEquipementApi(
  equipementId: number,
  debut: Date,
  fin: Date,
): Promise<Emprunt[]> {
  return fetchClient.get(
    `/emprunts/equipement/${equipementId}?debut=${formatLocalDateTime(debut)}&fin=${formatLocalDateTime(fin)}`,
  );
}

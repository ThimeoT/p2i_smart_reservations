import type { Equipement } from '../../equipments/types/equipement.types';

export interface Exemplaire {
  id: number;
  nomSerie: string;
  equipement: Equipement;
  statutDisponibilite: StatutDisponibilite;
}

export interface ExemplaireRequest {
  id: number;
  equipementId: number;
  statutDisponibilite: StatutDisponibilite;
  nomSerie: number;
}

export type StatutDisponibilite =
  | 'DISPONIBLE'
  | 'EMPRUNTE'
  | 'MAINTENANCE'
  | 'HORS_SERVICE';

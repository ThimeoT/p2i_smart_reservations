import type { Emprunt } from './emprunt.types';

export interface QuantiteEquipement {
  equipementId: number;
  quantite: number;
}

export interface SessionRequest {
  id?: number;
  quantitesEquipements: QuantiteEquipement[];
  debut: string;
  fin: string;
}

export interface SessionResume {
  id: number;
  debut: string;
  fin: string;
}

export interface Session {
  id: number;
  emprunts: Emprunt[];
  debut: string;
  fin: string;
}

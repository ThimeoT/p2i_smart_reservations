import type { EquipementResume } from './equipement.types';

export interface RelationEquipement {
  id: number;
  statutRelationEquipement: StatutRelationEquipement;
  equipementSourceId: number;
  equipementsCible: EquipementResume[];
  commentaire: string;
}

export interface RelationEquipementRequest {
  id?: number;
  statutRelationEquipement: StatutRelationEquipement;
  equipementsCibleId: number[]; // ne doit pas être vide
  commentaire: string;
}

export type StatutRelationEquipement = 'COMPATIBLE' | 'RECOMMANDE' | 'REQUIS';

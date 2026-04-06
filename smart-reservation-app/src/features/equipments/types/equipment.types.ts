import type { Exemplaire } from '../../exemplaires/types/exemplaire.types';
import type { Label } from './label.types';

export interface EquipementRequest {
  nom: string;
  description: string;
  urlImage: string; // sensé être une URL valide
  labelsId: number[];
  liensRessources: string[]; //  URL à valider aussi
  relationsEquipement?: EquipementRelationRequest[];
}

export interface Equipement {
  id: number;
  nom: string;
  description: string;
  urlImage: string;
  labels: Label[];
  exemplaires: Exemplaire[];
  liensRessources: string[];
  relationsEquipement: StatutEquipementRelation[];
}

export interface EquipementResume {
  id: number;
  nom: string;
  urlImage: string;
  labels: Label[];
}

export interface EquipementRelationRequest {
  id?:number;
  statutRelationEquipement: StatutEquipementRelation;
  equipementsCibleId: number[]; // ne doit pas être vide
  commentaire: string;
}

export type StatutEquipementRelation = 'COMPATIBLE' | 'RECOMMANDE' | 'REQUIS';

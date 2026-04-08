import type { Exemplaire } from '../../exemplaires/types/exemplaire.types';
import type { Label } from '../../label/types/label.types';

export interface EquipementRequest {
  nom: string;
  description: string;
  urlImage: string; // sensé être une URL valide
  labelsId: number[];
  liensRessources: string[]; //  URL à valider aussi
  relationsEquipement?: RelationEquipementRequest[];
}

export interface Equipement {
  id: number;
  nom: string;
  description: string;
  urlImage: string;
  labels: Label[];
  exemplaires: Exemplaire[];
  liensRessources: string[];
  relationsEquipement: RelationEquipementRequest[];
}

export interface EquipementResume {
  id: number;
  nom: string;
  urlImage: string;
  labels: Label[];
}

export interface RelationEquipementRequest {
  id?:number;
  statutRelationEquipement: StatutRelationEquipement;
  equipementsCibleId: number[]; // ne doit pas être vide
  commentaire: string;
}

export type StatutRelationEquipement = 'COMPATIBLE' | 'RECOMMANDE' | 'REQUIS';

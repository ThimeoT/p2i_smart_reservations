export interface EquipementRequest {
  nom: string;
  description: string;
  urlImage: string; // sensé être une URL valide
  labelsId?: number[];
  liensRessources: string[]; //  URL à valider aussi
  relationsEquipement?: RelationEquipementRequest[];
}

export interface RelationEquipementRequest {
  id?: number;
  statutRelationEquipement: StatutRelationEquipement;
  equipementsCibleId: number[]; // ne doit pas être vide
  commentaire: string;
}

export type StatutRelationEquipement = 'COMPATIBLE' | 'RECOMMANDE' | 'REQUIS';

import type { Instance } from '../../instances/types/instance.types';
import type { Label } from '../../label/types/label.types';
import type { RelationEquipementRequest, RelationEquipement } from './relationEquipement.types';

export interface EquipementRequest {
  nom: string;
  description: string;
  urlImage: string; // sensé être une URL valide
  labelsId: number[];
  liensRessources: string[]; //  URL à valider aussi
  relationsEquipement: RelationEquipementRequest[];
}

export interface Equipement {
  id: number;
  nom: string;
  description: string;
  urlImage: string;
  labels: Label[];
  instances: Instance[];
  liensRessources: string[];
  relationsEquipement: RelationEquipement[];
}

export interface EquipementResume {
  id: number;
  nom: string;
  urlImage: string;
  labels: Label[];
}


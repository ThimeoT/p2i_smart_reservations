export interface Label {
  id: number;
  nom: string;
  description: string;
  color: string;
}

export interface LabelRequest {
  id?: number;
  nom: string;
  description: string;
  color: string;
}
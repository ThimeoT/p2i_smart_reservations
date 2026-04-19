import type { Exemplaire } from '../../instances/types/exemplaire.types';
import type { Session } from './session.types';

export type StatutEmprunt = 'PLANIFIE' | 'EN_COURS' | 'TERMINE' | 'ANNULE';

export interface Emprunt {
  id: number;
  statut: StatutEmprunt;
  session: Session;
  exemplaire: Exemplaire;
  dateRetourPrevue: string;
  dateRetourReelle: string | undefined;
}

export interface EmpruntRequest {
  id: number;
  sessionId: number;
  utilisateurId: number;
  exemplaireId: number;
  dateRetourPrevue: string;
}

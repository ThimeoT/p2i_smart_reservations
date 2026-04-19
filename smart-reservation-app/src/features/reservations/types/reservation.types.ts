import type { User } from "../../users/types/user.types";
import type { Session, SessionRequest, SessionResume } from "./session.types";
import type { EquipementResume } from "../../equipments/types/equipment.types";

export type StatutActionReservation =
  | "CREATION"
  | "VALIDATION"
  | "REFUS"
  | "RECTIFICATION"
  | "SUPPRESSION";

export interface HistoriqueReservation {
  id: number;
  action: StatutActionReservation;
  utilisateur: User;
  date: string;
  commentaire: string;
}

export interface ActionReservationRequest {
  utilisateurId: number;
  message: string;
}

export type StatutReservation =
  | 'EN_ATTENTE'
  | 'VALIDEE'
  | 'REFUSEE'
  | 'SUPPRIMEE';

export interface ReservationRequest {
  id?: number;
  utilisateurId: number;
  titre: string;
  description: string;
  statut: StatutReservation;
  sessions: SessionRequest[];
}

export interface Reservation {
  id: number;
  utilisateur: User;
  titre: string;
  statut: StatutReservation;
  sessions: Session[];
  historiques: HistoriqueReservation[];
}

export interface ReservationResume {
  id: number;
  titre: string;
  statut: StatutReservation;
  utilisateur: User;
  sessions: SessionResume[];
  equipements: EquipementResume[];
}

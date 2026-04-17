import type { User } from "../../users/types/user.types";
import type { QuantiteEquipement, Session, SessionRequest } from "./session.types";


export type StatutActionReservation =
| "CREATION"
| "VALIDATION"
| "REFUS"
| "RECTIFICATION"
| "SUPPRESSION"

export interface HistoriqueReservation {
  id:number,
  action : StatutActionReservation,
  utilisateur : User,
  date : string,
  commentaire : string,

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
  sessions : SessionRequest[],
}

export interface Reservation {
  id : number,
  utilisateur : User,
  titre : string,
  statut : StatutReservation,
  sessions : Session[],
  historiques : HistoriqueReservation[],
}

export interface ReservationResume {
  id?:number,
  titre:string,
  statut : StatutReservation,
  utilisateur : User,
  nombreSessions : number,
  nombreEquipements : number,
}

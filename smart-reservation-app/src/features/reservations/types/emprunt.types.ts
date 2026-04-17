import type { Exemplaire } from "../../exemplaires/types/exemplaire.types";
import type { Session } from "./session.types";

export interface Emprunt {
  id : number,
  session : Session,
  exemplaire : Exemplaire,
  dateRetourPrevue : string,
  dateRetourReelle : string | undefined,
}

export interface EmpruntRequest {
  id : number,
  sessionId : number,
  utilisateurId : number,
  exemplaireId : number,
  dateRetourPrevue : string,
}
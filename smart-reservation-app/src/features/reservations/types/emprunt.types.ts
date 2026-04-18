import type { Instance } from "../../instances/types/instance.types";
import type { Session } from "./session.types";

export interface Emprunt {
  id : number,
  session : Session,
  instance : Instance,
  dateRetourPrevue : string,
  dateRetourReelle : string | undefined,
}

export interface EmpruntRequest {
  id : number,
  sessionId : number,
  utilisateurId : number,
  instanceId : number,
  dateRetourPrevue : string,
}

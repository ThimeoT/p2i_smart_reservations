export interface LoginCredentials {
  mail: string;
  password: string;
}

export interface AuthUser {
  id: number;
  mail: string;
  role: 'ADMIN' | 'USER';
  statut: 'INVITE' | 'ACTIF' | 'EXPIRE' | 'DESACTIVE';
}

export interface InitialisationFormData {
  id: number;
  nouveauMotDePasse: string;
  nom: string;
  prenom: string;
  formation?: string; // optionnel
}

export interface InvitationRequest {
  mail: string
  role: string
}

export interface InvitationResponse {
  mail: string
  motDePasseTemporaire: string
}

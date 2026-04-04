export interface LoginCredentials {
  mail: string;
  password: string;
}

export interface AuthUser {
  mail: string;
  role: 'ADMIN' | 'USER';
  id: number;
}

export interface AuthTokenResponse {
  token: string;
  mail: string;
  role: 'ADMIN' | 'USER';
  id: number;
}

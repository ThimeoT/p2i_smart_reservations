export interface LoginCredentials {
  username: string  // Spring attend "username" par défaut
  password: string
}

export interface AuthUser {
  mail: string
  role: 'ADMIN' | 'USER'
}
export interface LoginCredentials {
  username: string 
  password: string
}

export interface AuthUser {
  mail: string
  role: 'ADMIN' | 'USER'
}
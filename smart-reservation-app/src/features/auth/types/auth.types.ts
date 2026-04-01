export interface LoginCredentials {
  username: string 
  password: string
}

export interface AuthUser {
  id : number
  mail: string
  role: 'ADMIN' | 'USER'
}
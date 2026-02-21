export interface NewUser {
  name: string, 
  email: string, 
  password: string, 
  confirmPassword?: string
}

export interface LoginData {
  email: string, 
  password: string
}

export interface BasicUserData {
  id: string, 
  name: string, 
  email: string
}
import { BasicUserData } from "./user.model";

export interface AuthenticationContextData {
  user: BasicUserData | null, 
  isLoading: boolean, 
  signIn: (token: string, userData: BasicUserData) => Promise<void>, 
  signOut: () => Promise<void>
}

export interface AuthenticationProviderData {
  children: React.ReactNode
}
import { criticalStatusCodes } from "@/constants/status-codes";
import { AuthenticationContextData, AuthenticationProviderData } from "@/models/authentication.model";
import { BasicUserData } from "@/models/user.model";
import { api } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext<AuthenticationContextData>({} as AuthenticationContextData)

export function AuthenticationProvider({ children }: AuthenticationProviderData) {
  const [user, setUser] = useState<BasicUserData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // useEffect que verifica se o usuário está logado e configura as requisições do Axios
  useEffect(() => {
    async function loadStorageData() {
      const token = await AsyncStorage.getItem('token')
      const userData = await AsyncStorage.getItem('userData')

      if(token && userData) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(JSON.parse(userData))
      }

      setIsLoading(false)
    }

    loadStorageData()
  }, [])

  // useEffect que configura o Axios para tratar erros (token expirado ou problemas com o servidor)
  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        if(criticalStatusCodes.includes(error.response?.status) || error.code == 'ERR_NETWORK') 
          await signOut()

        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.response.eject(responseInterceptor)
    }
  }, [])

  // Função de login
  async function signIn(token: string, userData: BasicUserData) {
    await AsyncStorage.setItem('token', token)
    await AsyncStorage.setItem('userData', JSON.stringify(userData))

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    setUser(userData)
  }

  // Função de logout
  async function signOut() {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userData')

    setUser(null)
  }

  return (
    <AuthenticationContext.Provider value={{ user, isLoading, signIn, signOut }}>
      { children }
    </AuthenticationContext.Provider>
  )
}
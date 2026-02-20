import { LoginData, NewUser } from '@/models/user.model';
import axios, { isAxiosError } from 'axios'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, 
  timeout: 5000
});

// Criação de novo usuário
export async function createUser(user: NewUser) {
  try {
    const resp = await api.post('/users', user)

    return { status: resp.status, message: resp.data.message }
  } catch(error: any) {
    if(isAxiosError(error)) {
      if(error.response)
        return { status: error.response.status, message: error.response.data.message }
      else if(error.request)
        return { status: 500, message: 'Não foi possível conectar-se ao servidor.' }
    } 

    console.error('Erro ao criar usuário: ', error)
    return { status: error.response.status, message: error.response.data.message } 
  }
}

// Login do usuário
export async function loginUser(data: LoginData) {
  try {
    const resp = await api.post('/users/login', data)

    return { status: resp.status, message: resp.data.message, goals: resp.data.goals }
  } catch(error: any) {
    if(isAxiosError(error)) {
      if(error.response)
        return { status: error.response.status, message: error.response.data.message }
      else if(error.request)
        return { status: 500, message: 'Não foi possível conectar-se ao servidor.' }
    } 

    console.error('Erro ao fazer login: ', error)
    return { status: error.response.status, message: error.response.data.message }
  }
}
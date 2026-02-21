import { LoginData, NewUser } from '@/models/user.model';
import { isAxiosError } from 'axios'
import { api } from './api';

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

    return { 
      status: resp.status, 
      user: resp.data.user, 
      goals: resp.data.goals, 
      token: resp.data.token, 
      message: resp.data.message, 
    }
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
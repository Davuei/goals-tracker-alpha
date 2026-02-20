import { LoginData, NewUser } from '@/models/user.model';
import axios from 'axios'

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
    console.error(error)
    console.error(error.response.data.message)
    return { status: error.response.status, message: error.response.data.message }
  }
}

export async function loginUser(data: LoginData) {
  try {
    const resp = await api.post('/users/login', data)

    return { status: resp.status, message: resp.data.message, goals: resp.data.goals }
  } catch(error: any) {
    console.error(error)
    console.error(error.response.data.message)
    return { status: error.response.status, message: error.response.data.message }
  }
}
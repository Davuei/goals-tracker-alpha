import { NewUser } from '@/models/user.model';
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, 
  timeout: 5000
});

export async function createUser(user: NewUser) {
  try {
    const resp = await api.post('/users', user)

    return resp.data.message

  } catch(error: any) {
    console.error(error)
    return error.response.data.message
  }
}
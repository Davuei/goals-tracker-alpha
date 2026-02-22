import { Goal } from '@/models/goal.model'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from './api'
import { isAxiosError } from 'axios'

// Carrega todas as metas salvas localmente
export async function loadGoals() {
  try {
    const token = await AsyncStorage.getItem('token')
    const userData = await AsyncStorage.getItem('userData')

    if(token && userData) {
      const resp = await api.get('/users/goals')

      return { status: resp.status, data: resp.data.goals }
    } else {
      const savedGoals = await AsyncStorage.getItem('localSavedGoals')
      return savedGoals != null ? JSON.parse(savedGoals) : []
    }
  } catch(error: any) {
    if(isAxiosError(error)) {
      if(error.response)
        return { status: error.response.status, message: error.response.data.message }
      else if(error.request)
        return { status: 500, message: 'Não foi possível conectar-se ao servidor' }
    }
    console.error(error)
    return { status: error.response.status, message: error.response.data.message }
  }
}

// Salva uma nova meta localmente
export async function saveNewGoal(newGoal: Goal) {
  try {
    const token = await AsyncStorage.getItem('token')
    const userData = await AsyncStorage.getItem('userData')

    if(token && userData) {
      const resp = await api.post('/goals', newGoal)

      return {
        status: resp.status, 
        data: resp.data.data, 
        message: resp.data.message
      }
    } else {
      const savedGoals = await loadGoals()
      savedGoals.push(newGoal)
      await AsyncStorage.setItem('localSavedGoals', JSON.stringify(savedGoals))
      return { 
        status: 201, 
        data: newGoal, 
        message: `Meta '${ newGoal.title }' salva localmente!`
      }
    }
  } catch(error: any) {
    if(isAxiosError(error)) {
      if(error.response)
        return { status: error.response.status, message: error.response.data.message }
      else if(error.request)
        return { status: 500, message: 'Não foi possível conectar-se ao servidor' }
    }
    console.error(error)
    return { status: error.response.status, message: error.response.data.message }
  }
}

// Limpa / reseta todos os registros de metas salvas localmente
export async function clearGoals() {
  await AsyncStorage.removeItem('localSavedGoals')
}
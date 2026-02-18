import { Goal } from '@/models/goal.model'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Carrega todas as metas salvas localmente
export async function loadGoals() {
  const savedGoals = await AsyncStorage.getItem('localSavedGoals')
  return savedGoals != null ? JSON.parse(savedGoals) : []
}

// Salva uma nova meta localmente
export async function saveNewGoal(newGoal: Goal) {
  try {
    const savedGoals = await loadGoals()

    savedGoals.push(newGoal)

    await AsyncStorage.setItem('localSavedGoals', JSON.stringify(savedGoals))
  } catch (error: any) {
    throw new Error('Erro ao salver localmente')
  }
}

// Limpa / reseta todos os registros de metas salvas localmente
export async function clearGoals() {
  await AsyncStorage.removeItem('localSavedGoals')
}
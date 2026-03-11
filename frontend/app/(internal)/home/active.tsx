import { DefaultText } from "@/components/default-text"
import { GoalComponent } from "@/components/goal-component"
import { IconButton } from "@/components/icon-button"
import { ScreenContainer } from "@/components/screen-container"
import { successStatusCodes } from "@/constants/status-codes"
import { Goal } from "@/models/goal.model"
import { loadActiveGoals } from "@/services/goals-service.service"
import { toastWrapper } from "@/utils/toast-wrapper"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, View } from "react-native"

export default function ActiveGoals() {
  const [activeGoals, setActiveGoals] = useState<Goal[]>([])

  const router = useRouter()

  useEffect(() => {
    async function getActiveGoals() {
      const resp = await loadActiveGoals()

      if(resp.status) {
        if(successStatusCodes.includes(resp.status))
          setActiveGoals(resp.data)
        else 
          toastWrapper.error('Erro ao carregar dados', resp.message)
      } else
        setActiveGoals(resp)
    }
    getActiveGoals()
  }, [])

  return (
    <ScreenContainer>
      <View
        style={{
          width: '100%', 
          height: '100%', 
          gap: 16
        }}
      >
        <View
          style={{
            width: '100%', 
            padding: 2, 
            flexDirection: 'row-reverse'
          }}
        >
          <IconButton 
            style='filled' 
            format='square' 
            onPress={ () => router.push('/create-new-goal') }
          >
            <Ionicons name='add' size={24} color={'transparent'} />
          </IconButton>
        </View>

        <View
          style={{
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
          }}
        >
          {
            activeGoals.length > 0 ? (
              <FlatList 
                data={ activeGoals } 
                keyExtractor={ (goal) => String(goal.id) } 

                contentContainerStyle={{
                  padding: 2, 
                  paddingBottom: 40
                }} 
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}

                renderItem={({ item }) => (
                  <GoalComponent 
                    goalTitle={ item.title } 
                    startDate={ item.startDate } 
                    endDate={ item.endDate }
                  />
                )}
              />
            ) : (
              <DefaultText textColor='white'>
                {`Nenhuma meta encontrada...\nExperimente adicionar uma nova!`}
              </DefaultText>
            )
          }
        </View>
      </View>
    </ScreenContainer>
  )
}
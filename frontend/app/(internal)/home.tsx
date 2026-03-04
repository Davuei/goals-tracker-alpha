import { DefaultText } from "@/components/default-text"
import { GoalComponent } from "@/components/goal-component"
import { IconButton } from "@/components/icon-button"
import { ScreenContainer } from "@/components/screen-container"
import { Goal } from "@/models/goal.model"
import { loadGoals } from "@/services/goals-service.service"
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View } from "react-native"

export default function Home() {
  const [allGoals, setAllGoals] = useState<Goal[]>([])

  const router = useRouter()

  useEffect(() => {
    async function loadAllGoals() {
      const resp = await loadGoals()

      if(resp.status && resp.data)
        setAllGoals(resp.data)
      else
        setAllGoals(resp)
    }
    loadAllGoals()
  }, [])

  return (
    <ScreenContainer>
      <View
        style={{
          width: '100%', 
          height: '100%', 
          paddingTop: 12, 
          paddingBottom: 80, 
          gap: 16
        }}
      >
        <View
          style={{
            width: '100%', 
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
            gap: 20
          }}
        >
          {
            allGoals.length > 0 ? (
              allGoals.map(goal => {
                return (
                  <GoalComponent 
                    key={ goal.id } 
                    goalTitle={ goal.title } 
                    startDate={ goal.startDate } 
                    endDate={ goal.endDate }
                  />
                )
              })
            ) : (
              <DefaultText textColor='white'>
                Comece adicionando uma meta!
              </DefaultText>
            )
          }
        </View>
      </View>
    </ScreenContainer>
  )
}
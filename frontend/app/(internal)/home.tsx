import { DefaultText } from "@/components/default-text";
import { GoalComponent } from "@/components/goal-component";
import { IconButton } from "@/components/icon-button";
import { ScreenContainer } from "@/components/screen-container";
import { Goal } from "@/models/goal.model";
import { loadGoals, saveNewGoal } from "@/services/goals-service.service";
import { toastWrapper } from "@/utils/toast-wrapper";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [allGoals, setAllGoals] = useState<Goal[]>([])

  useEffect(() => {
    async function loadAllGoals() {
      const resp = await loadGoals()

      setAllGoals(resp.data)
    }
    loadAllGoals()
  }, [])

  const handleAddNewGoal = async () => {
    const newGoal: Goal = {
      id: Math.floor(Math.random() * 1000), // ID PALIATIVO
      title: 'teste'
    }

    const resp = await saveNewGoal(newGoal)

    if(resp.status == 200 || resp.status == 201) {
      toastWrapper.success('Meta salva!', resp.message)

      setAllGoals((prevState) => [...prevState, resp.data])
    }
    else 
      toastWrapper.error('Erro ao salvar meta', resp.message)
  }

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
            onPress={ handleAddNewGoal }
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
                  <GoalComponent key={ goal.id } goalTitle={ goal.title } />
                )
              })
            ) : (
              <DefaultText>
                Comece adicionando uma meta!
              </DefaultText>
            )
          }
        </View>
      </View>
    </ScreenContainer>
  )
}
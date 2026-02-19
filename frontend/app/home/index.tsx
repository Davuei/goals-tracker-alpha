import { DefaultText } from "@/components/default-text";
import { GoalComponent } from "@/components/goal-component";
import { IconButton } from "@/components/icon-button";
import { ScreenContainer } from "@/components/screen-container";
import { Goal } from "@/models/goal.model";
import { loadGoals, saveNewGoal } from "@/services/data-service.service";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [allGoals, setAllGoals] = useState<Goal[]>([])

  useEffect(() => {
    async function loadAllGoals() {
      const resp = await loadGoals()

      setAllGoals(resp)
    }

    loadAllGoals()
  })

  const handleAddNewGoal = async () => {
    const newGoal: Goal = {
      id: Math.floor(Math.random() * 1000), 
      title: 'teste'
    }

    await saveNewGoal(newGoal)
  }

  return (
    <ScreenContainer>
      <View
        style={{
          width: '100%', 
          height: '100%', 
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
    </ScreenContainer>
  )
}
import { DefaultText } from "@/components/default-text";
import { GoalComponent } from "@/components/goal-component";
import { ScreenContainer } from "@/components/screen-container";
import { successStatusCodes } from "@/constants/status-codes";
import { Goal } from "@/models/goal.model";
import { loadExpiredGoals } from "@/services/goals-service.service";
import { toastWrapper } from "@/utils/toast-wrapper";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function ExpiredGoals() {
  const [expiredGoals, setExpiredGoals] = useState<Goal[]>([])

  useEffect(() => {
    async function getExpiredGoals() {
      const resp = await loadExpiredGoals()

      if(resp.status) {
        if(successStatusCodes.includes(resp.status))
         setExpiredGoals(resp.data)
        else
          toastWrapper.error('Erro ao carregar metas', resp.message)
      } else 
        setExpiredGoals(resp)
    }
    getExpiredGoals()
  }, [])

  return (
    <ScreenContainer>
      <View
        style={{
          width: '100%', 
          height: '100%', 
          paddingTop: 16, 
          justifyContent: 'center', 
          alignItems: 'center'
        }}
      >
        {
          expiredGoals.length > 0 ? (
            <FlatList 
              data={ expiredGoals } 
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
              {`Nenhuma meta encontrada...`}
            </DefaultText>
          )
        }
      </View>
    </ScreenContainer>
  )
}
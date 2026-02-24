import { DefaultInput } from "@/components/default-input";
import { DefaultModal } from "@/components/default-modal";
import { DefaultText } from "@/components/default-text";
import { GoalComponent } from "@/components/goal-component";
import { IconButton } from "@/components/icon-button";
import { ScreenContainer } from "@/components/screen-container";
import { Goal } from "@/models/goal.model";
import { loadGoals, saveNewGoal } from "@/services/goals-service.service";
import { toastWrapper } from "@/utils/toast-wrapper";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";

export default function Home() {
  const [allGoals, setAllGoals] = useState<Goal[]>([])
  const [showNewGoalModal, setShowNewGoalModal] = useState<boolean>(false)

  const { control, reset,  handleSubmit, formState: { errors } } = useForm<{ title: string }>()

  useEffect(() => {
    async function loadAllGoals() {
      const resp = await loadGoals()

      if(resp.status != undefined && resp.data != undefined)
        setAllGoals(resp.data)
      else
        setAllGoals(resp)
    }
    loadAllGoals()
  }, [])

  const handleSwitchNewGoalModal = () => setShowNewGoalModal((prevState) => !prevState)

  const handleAddNewGoal: SubmitHandler<{ title: string }> = async (data) => {
    const newGoal: Goal = {
      id: Math.floor(Math.random() * 1000), // ID PALIATIVO
      title: data.title
    }

    const resp = await saveNewGoal(newGoal)

    if(resp.status == 200 || resp.status == 201) {
      toastWrapper.success('Meta salva!', resp.message)

      setAllGoals((prevState) => [...prevState, resp.data])
    }
    else 
      toastWrapper.error('Erro ao salvar meta', resp.message)

    setShowNewGoalModal(false)
    reset()
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
            onPress={ handleSwitchNewGoalModal }
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
              <DefaultText textColor='white'>
                Comece adicionando uma meta!
              </DefaultText>
            )
          }
        </View>
      </View>

      <DefaultModal 
        title='Adicione uma nova meta!' 
        text='Dê um nome para a sua meta!' 
        textColor='white' 
        confirmText='Criar meta' 
        closeText='Cancelar' 
        onConfirm={ handleSubmit(handleAddNewGoal) } 
        onClose={ handleSwitchNewGoalModal } 
        isOpen={ showNewGoalModal }
      >
        <DefaultInput 
          label='Meta' 
          textColor='dark' 
          keyboardType='default' 

          control={ control } 
          inputName='title' 
          validateOpt={{ required: '* Nome obrigatório' }} 
          error={ errors.title }
        />
      </DefaultModal>
    </ScreenContainer>
  )
}
import { DefaultCalendar } from "@/components/default-calendar"
import { DefaultModal } from "@/components/default-modal"
import { DefaultText } from "@/components/default-text"
import { DefaultTitle } from "@/components/default-title"
import { ScreenContainer } from "@/components/screen-container"
import { Goal, GoalDates, NewGoal } from "@/models/goal.model"
import { formatHyphenStringDate } from "@/utils/format-date"
import { useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { View } from "react-native"
import { CalendarInput } from "@/components/calendar-input"
import { DefaultPressable } from "@/components/default-pressable"
import { DefaultInput } from "@/components/default-input"
import { saveNewGoal } from "@/services/goals-service.service"
import { toastWrapper } from "@/utils/toast-wrapper"
import { useRouter } from "expo-router"
import { successStatusCodes } from "@/constants/status-codes"

export default function CreateNewGoal() {
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false)
  const [goalDates, setGoalDates] = useState<GoalDates>({ startDate: '', endDate: '' })

  const router = useRouter()

  const methods = useForm<Goal>()

  const handleSwitchCalendarModel = () => setShowCalendarModal((prevState) => !prevState)

  const handleClearDates = () => setGoalDates({ startDate: '', endDate: '' })

  const handleCreateNewGoal: SubmitHandler<Goal> = async (data) => {
    const newGoal: NewGoal = {
      id: Math.floor(Math.random() * 1000), // ID PALIATIVO
      title: data.title, 
      startDate: new Date(`${data.startDate}T00:00:00.000Z`), 
      endDate: new Date(`${data.endDate}T23:59:59.000Z`)
    }
    
    const resp = await saveNewGoal(newGoal)

    if(successStatusCodes.includes(resp.status)) {
      toastWrapper.success('Meta criada com sucesso!', resp.message)
      router.replace('/home')
    } else
      toastWrapper.error('Erro ao criar meta', resp.message)
  }

  return (
    <ScreenContainer>
      <FormProvider { ...methods }>
        <View
          style={{ 
            width: '100%', 
            height: '100%',  
            justifyContent: 'space-evenly', 
            alignItems: 'center'
          }}
        >
          <DefaultTitle titleColor='white'>
            Adicione uma nova meta!
          </DefaultTitle>

          <DefaultText textColor='white'>
            Defina um nome e o intervalo da sua meta!
          </DefaultText>

          <View
            style={{
              width: '100%', 
              gap: 16
            }}
          >
            <DefaultInput 
              label='Nome' 
              keyboardType='default'
              
              control={ methods.control } 
              inputName='title' 
              validateOpt={{ required: '* Nome obrigatório' }} 
              error={ methods.formState.errors.title }
            />

            <CalendarInput 
              dates={ goalDates } 
              showCalendarModal={ handleSwitchCalendarModel } 
            />

            <DefaultPressable 
              style='filled' 
              format='long' 
              onPress={ methods.handleSubmit(handleCreateNewGoal) } 
            >
              Criar meta
            </DefaultPressable>
          </View>
        </View>

        <DefaultModal
          title='Início e fim da meta' 
          text='Selecione o início e o fim da sua meta.' 
          textColor='white' 
          isOpen={ showCalendarModal } 

          confirmText='Limpar intervalo' 
          closeText='Salvar e voltar' 
          onConfirm={ handleClearDates } 
          onClose={ handleSwitchCalendarModel }
        >
          <DefaultCalendar 
            dates={ goalDates }
            updateDates={ setGoalDates } 
          />

          <View>
            <DefaultText textColor='dark'>
              { `${ formatHyphenStringDate(goalDates.startDate) } - ${ formatHyphenStringDate(goalDates.endDate) }` }
            </DefaultText>
          </View>
        </DefaultModal>
      </FormProvider>
    </ScreenContainer>
  )
}
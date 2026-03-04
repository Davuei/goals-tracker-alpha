import { StyleSheet, View } from "react-native"
import { DefaultLabel } from "./default-label"
import { IconButton } from "./icon-button"
import { Ionicons } from "@expo/vector-icons"
import { Goal, GoalDates } from "@/models/goal.model"
import { VisualInput } from "./visual-input"
import { formatHyphenStringDate } from "@/utils/format-date"
import { colors } from "@/constants/colors"
import { useFormContext } from "react-hook-form"

interface CalendarInputProps {
  dates: GoalDates; 
  showCalendarModal: () => void; 
}

export function CalendarInput({ dates, showCalendarModal }: CalendarInputProps) {
  const { control, formState: { errors } } = useFormContext<Goal>()

  return (
    <View
      style={ styles.viewContainer }
    >
      <View>
        <DefaultLabel labelColor='white'>
          Intervalo
        </DefaultLabel>

        <View 
          style={ styles.viewContent }
        >
          <IconButton 
            style='filled' 
            format='square' 
            onPress={ showCalendarModal }
          >
            <Ionicons name='calendar-number-sharp' size={ 28 } color='transparent' />
          </IconButton>

          <View 
            style={ styles.viewVisualInputs }
          >
            <VisualInput 
              label='Início'
              onPress={ showCalendarModal } 
              control={ control } 
              inputName='startDate' 
              error={ errors.startDate }
            >
              { formatHyphenStringDate(dates.startDate) }
            </VisualInput>

            <VisualInput 
              label='Fim'
              onPress={ showCalendarModal } 
              control={ control } 
              inputName='endDate' 
              error={ errors.endDate }
            >
              { formatHyphenStringDate(dates.endDate) }
            </VisualInput>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%'
  }, 
  viewContent: {
    width: '100%', 
    padding: 12, 

    alignItems: 'center', 
    flexDirection: 'row', 
    gap: 16, 

    borderWidth: 2, 
    borderColor: colors.greenScales.green200, 
    borderRadius: 8
  }, 
  viewVisualInputs: {
    width: '80%', 
    flexDirection: 'column', 
    gap: 16
  }
})
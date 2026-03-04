import { colors } from "@/constants/colors"
import { Goal, GoalDates } from "@/models/goal.model"
import { SetStateAction } from "react"
import { useFormContext } from "react-hook-form"
import { View } from "react-native"
import { Calendar, DateData, LocaleConfig } from "react-native-calendars"

interface DefaultCalendarProps {
  dates: GoalDates;
  updateDates: React.Dispatch<SetStateAction<GoalDates>>
}

export function DefaultCalendar({ dates, updateDates }: DefaultCalendarProps) {
  const { setValue } = useFormContext<Goal>()

  LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje'
  }
  LocaleConfig.defaultLocale = 'pt-br'

  const handleDayPress = (day: DateData) => {
    const selectedDate = day.dateString;

    if(dates.startDate != '' && dates.endDate != '')
      return
    else if (dates.startDate == '') {
      updateDates({startDate: selectedDate, endDate: ''})
      setValue('startDate', selectedDate, { shouldValidate: true })
    }
    else {
      if (selectedDate > dates.startDate) {
        updateDates((prevState) => ({...prevState, endDate: selectedDate}))
        setValue('endDate', selectedDate, { shouldValidate: true })
      } else {
        const tempEnd = dates.startDate
        updateDates({startDate: selectedDate, endDate: tempEnd})
        setValue('startDate', selectedDate, { shouldValidate: true })
        setValue('endDate', tempEnd, { shouldValidate: true })
      }
    }
  }

  const handleGetPeriod = () => {
    const selected: any = {}

    if(dates.startDate != '' && dates.endDate == '') {
      selected[dates.startDate] = {
        startingDay: true, 
        endingDay: true, 
        color: colors.greenScales.green200, 
        textColor: colors.textPrimary
      }
    } else if(dates.startDate != '' && dates.endDate != '') {
      selected[dates.startDate] = {
        startingDay: true, 
        color: colors.greenScales.green200, 
        textColor: colors.textPrimary
      }

      let firstDay = new Date(dates.startDate)
      firstDay.setDate(firstDay.getDate() + 1)

      const lastDay = new Date(dates.endDate)

      while(firstDay < lastDay) {
        const dateString = firstDay.toISOString().split('T')[0]
        selected[dateString] = { color: colors.greenScales.green100, textColor: colors.textPrimaryDark }
        firstDay.setDate(firstDay.getDate() + 1)
      }

      selected[dates.endDate] = {
        endingDay: true, 
        color: colors.greenScales.green200, 
        textColor: colors.textPrimary
      }
    }
    return selected
  }

  return (
    <View>
      <Calendar 
        markingType='period' 
        markedDates={ handleGetPeriod() }
        onDayPress={ handleDayPress }

        theme={{
          todayTextColor: colors.backgroundLight, 
          todayBackgroundColor: colors.greenScales.green300, 
          arrowColor: colors.backgroundDark
        }}
      />
    </View>
  )
}
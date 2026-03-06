import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { DefaultText } from "./default-text";
import { DefaultAnimatedPressable } from "./default-animated-pressable";
import { DefaultSecondaryText } from "./default-secondary-text";
import { formatISOStringDate } from "@/utils/format-date";

interface GoalComponentProps {
  goalTitle: string, 
  startDate: string, 
  endDate: string
}

export function GoalComponent({ goalTitle, startDate, endDate }: GoalComponentProps) {
  const handleSelectGoal = () => {

  }

  return (
    <DefaultAnimatedPressable style='hollow' format='long-square' onPress={ handleSelectGoal }>
        <View style={ styles.viewIcon }>

        </View>

        <View style={ styles.viewText }>
          <DefaultText textColor='white'>
            { goalTitle }
          </DefaultText>

          <DefaultSecondaryText>
            { `${ formatISOStringDate(startDate) } - ${ formatISOStringDate(endDate) }` }
          </DefaultSecondaryText>
        </View>
    </DefaultAnimatedPressable>
  )
}

const styles = StyleSheet.create({
  viewIcon: {
    width: 48, 
    height: 48, 
    borderWidth: 2, 
    borderColor: colors.greenScales.green200, 
    borderRadius: 8
  }, 
  viewText: {
    width: '80%', 
    
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column', 
  }
})
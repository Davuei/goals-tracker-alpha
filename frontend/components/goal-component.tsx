import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, View } from "react-native";
import { DefaultText } from "./default-text";
import { DefaultAnimatedPressable } from "./default-animated-pressable";

interface GoalComponentProps {
  goalTitle: string
}

export function GoalComponent({ goalTitle }: GoalComponentProps) {
  const handleSelectGoal = () => {

  }

  return (
    <DefaultAnimatedPressable style='hollow' format='long-square' onPress={ handleSelectGoal }>
        <View
          style={ styles.viewIcon }
        >

        </View>
        <DefaultText textColor='white'>
          { goalTitle }
        </DefaultText>
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
  }
})
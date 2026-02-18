import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";
import { DefaultText } from "./default-text";

interface GoalComponentProps {
  goalTitle: string
}

export function GoalComponent({ goalTitle }: GoalComponentProps) {
  return (
    <View
      style={ styles.viewContainer }
    >
      <View
        style={ styles.viewIcon }
      >

      </View>
      <DefaultText>
        { goalTitle }
      </DefaultText>
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%', 
    padding: 12, 
    alignItems: 'center', 
    flexDirection: 'row', 
    gap: 12, 
    borderWidth: 2, 
    borderColor: colors.greenScales.green200, 
    borderRadius: 8
  }, 
  viewIcon: {
    width: 48, 
    height: 48, 
    borderWidth: 2, 
    borderColor: colors.greenScales.green200, 
    borderRadius: 8
  }
})
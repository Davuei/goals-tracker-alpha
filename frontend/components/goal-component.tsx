import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, View } from "react-native";
import { DefaultText } from "./default-text";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface GoalComponentProps {
  goalTitle: string
}

export function GoalComponent({ goalTitle }: GoalComponentProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 150 })
  }

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 })
  }

  return (
    <Pressable
      style={[ 
        styles.viewContainer, 
        /* animatedStyle  */
      ]}

      /* onPressIn={ handlePressIn } 
      onPressOut={ handlePressOut } */
    >
      {/* <View
        style={ styles.viewContainer }
      > */}
        <View
          style={ styles.viewIcon }
        >

        </View>
        <DefaultText>
          { goalTitle }
        </DefaultText>
      {/* </View> */}
    </Pressable>
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
import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { DefaultAnimatedPressable, DefaultAnimatedPressableProps } from "./default-animated-pressable";

const AnimatedButton = Animated.createAnimatedComponent(Pressable)

export function IconButton({ style, format, onPress, children }: DefaultAnimatedPressableProps) {
  /* const scale = useSharedValue(1)
  
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
  } */

  return (
    <DefaultAnimatedPressable style={ style } format={ format } onPress={ onPress }>
      { children }
    </DefaultAnimatedPressable>
    /* <AnimatedButton
      style={[
        styles.pressable, 
        animatedStyle
      ]} 

      onPress={ onPress }

      onPressIn={ handlePressIn }
      onPressOut={ handlePressOut }
    >
      <View
        style={
          styles.view
        }
      >
        { children }
      </View>
    </AnimatedButton> */
  )
}

const styles = StyleSheet.create({
  pressable: {
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: colors.greenScales.green200, 
    borderRadius: 8
  }, 
  view: {
    padding: 10, 
    margin: 2, 
    borderWidth: 2, 
    borderColor: colors.backgroundDark, 
    borderRadius: 8
  }
})
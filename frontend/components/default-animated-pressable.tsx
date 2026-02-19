import { colors } from "@/constants/colors"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export interface DefaultAnimatedPressableProps {
  style: 'filled' | 'hollow', 
  format: 'long' | 'square' | 'long-square', 
  onPress: () => void, 
  children: any
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function DefaultAnimatedPressable({ style, format, onPress, children }: DefaultAnimatedPressableProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 150 })
  }

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 })
  }

  return (
    <AnimatedPressable
      style={[
        styles.defaultAnimatedPressable, 
        animatedStyle, 
        style == 'filled' && styles.defaultAnimatedPressableFilled, 
        format == 'long' && styles.defaultAnimatedPressableLong, 
        format == 'long-square' && styles.defaultAnimatedPressableLongSquare, 
      ]} 

      onPress={ onPress }
      onPressIn={ handlePressIn } 
      onPressOut={ handlePressOut }
    >
      <View
        style={[ 
          styles.view, 
          style == 'filled' && styles.viewFilled, 
          format == 'long' && styles.viewLong
        ]}
      >
        { children }
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  //DEFAULT STYLES
  defaultAnimatedPressable: {
    justifyContent: 'center', 
    alignItems: 'center', 

    borderWidth: 2, 
    borderColor: colors.greenScales.green200, 
    borderRadius: 8
  }, 
  view: {
    width: '100%', 
    padding: 10, 

    justifyContent: 'center', 
    alignItems: 'center', 

    color: colors.greenScales.green200, 

    backgroundColor: 'transparent', 

    borderRadius: 8
  }, 

  // STYLE FILLED STYLES
  defaultAnimatedPressableFilled: {
    backgroundColor: colors.greenScales.green200
  }, 
  viewFilled: {
    backgroundColor: colors.greenScales.green200, 

    borderWidth: 2, 
    borderColor: colors.backgroundDark, 
  }, 

  // FORMAT STYLES
  defaultAnimatedPressableLong: {
    width: '100%', 

    borderRadius: 28
  }, 
  defaultAnimatedPressableLongSquare: {
    width: '100%', 
    padding: 10, 

    borderRadius: 8
  }, 

  viewLong: {
    padding: 8, 

    borderRadius: 28
  }
})
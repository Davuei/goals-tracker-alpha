import { colors } from "@/constants/colors"
import { Pressable, StyleSheet, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export interface DefaultAnimatedPressableProps {
  style: 'filled' | 'hollow'; 
  format: 'long' | 'square' | 'long-square'; 
  onPress: () => void; 
  setDisabled?: boolean; 
  children: any
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function DefaultAnimatedPressable({ 
  style, 
  format, 
  onPress, 
  setDisabled=false, 
  children 
}: DefaultAnimatedPressableProps) {
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
        setDisabled && styles.disabledPressable
      ]} 

      onPress={ onPress }
      onPressIn={ handlePressIn } 
      onPressOut={ handlePressOut } 

      disabled={ setDisabled }
    >
      <View
        style={[ 
          styles.view, 
          style == 'filled' && styles.viewFilled, 
          format == 'long' && styles.viewLong, 
          format == 'long-square' && styles.viewLongSquare, 
          setDisabled && styles.disabledView
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

    outlineWidth: 2, 
    outlineColor: colors.greenScales.green200, 

    borderRadius: 8
  }, 
  view: {
    width: '100%', 
    padding: 8, 

    justifyContent: 'center', 
    alignItems: 'center', 

    color: colors.greenScales.green200, 

    backgroundColor: 'transparent', 

    borderRadius: 8
  }, 

  // STYLE FILLED STYLES
  defaultAnimatedPressableFilled: {
    borderWidth: 2, 
    borderColor: 'transparent', 
  }, 
  viewFilled: {
    backgroundColor: colors.greenScales.green200
  }, 

  // FORMAT STYLES
  defaultAnimatedPressableLong: {
    width: '100%', 

    borderRadius: 32
  }, 
  defaultAnimatedPressableLongSquare: {
    width: '100%', 
    padding: 2, 

    borderRadius: 8
  }, 

  viewLong: {
    borderRadius: 28
  }, 
  viewLongSquare: {
    justifyContent: 'flex-start', 
    flexDirection: 'row', 
    gap: 12
  }, 

  // DISABLED STYLES
  disabledPressable: {
    outlineColor: colors.grayScales.gray300
  }, 
  disabledView: {
    backgroundColor: colors.grayScales.gray300
  }
})
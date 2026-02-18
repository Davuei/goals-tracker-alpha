import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface DefaultPressableProps {
  style?: 'filled' | 'hollow'; 
  onPress: () => void; 
  children: string
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export function DefaultPressable({ style='hollow', onPress,  children }: DefaultPressableProps) {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }], 
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
        styles.pressable, 
        animatedStyle, 
        style == 'filled' && styles.pressableFilled, 
      ]} 

      onPress={ onPress }

      onPressIn={ handlePressIn } 
      onPressOut={ handlePressOut } 
    >
      <View
        style={[
          styles.view, 
          style == 'filled' && styles.viewFilled
        ]}
      >
        <Text 
          style={[ 
            styles.text, 
            style == 'filled' && styles.textFilled 
          ]}>
          { children }
        </Text>
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%', 
    padding: 2, 
    marginTop: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 2, 
    borderColor: colors.greenScales.green200, 
    borderRadius: 28, 
  }, 
  view: {
    padding: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  text: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: colors.greenScales.green200
  }, 

  pressableFilled: {
    backgroundColor: colors.greenScales.green200, 
    borderWidth: 0, 
    borderColor: 'transparent'
  }, 
  viewFilled: {
    width: '100%',     
    borderWidth: 2, 
    borderColor: colors.backgroundDark, 
    borderRadius: 28
  }, 
  textFilled: {
    color: 'transparent'
  }
})
import { colors } from "@/constants/colors"
import { StyleSheet, Text } from "react-native"

interface DefaultAnimatedPressableTextProps {
  style: 'filled' | 'hollow', 
  children: string
}

export function DefaultAnimatedPressableText({ style, children }: DefaultAnimatedPressableTextProps) {
  return (
    <Text
      style={[ 
        styles.text, 
        style == 'filled' && styles.textFilled
      ]}
    >
      { children }
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: colors.greenScales.green200
  }, 
  textFilled: {
    color: 'transparent'
  }
})
import { colors } from "@/constants/colors"
import { Text } from "react-native"

interface DefaultAnimatedPressableTextProps {
  style: 'filled' | 'hollow', 
  textColor?: 'white' | 'dark', 
  children: string
}

export function DefaultAnimatedPressableText({ style, textColor = 'dark',  children }: DefaultAnimatedPressableTextProps) {
  return (
    <Text
      style={{
        fontSize: 20, 
        fontWeight: 'bold', 
        color: style == 'filled' ? (
          textColor == 'dark' ? colors.backgroundDark : colors.backgroundLight
        ) : colors.greenScales.green200
      }}
    >
      { children }
    </Text>
  )
}
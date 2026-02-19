import { colors } from "@/constants/colors"
import { Text } from "react-native"

interface DefaultTextProps {
  children: string
}

export function DefaultText({ children }: DefaultTextProps) {
  return (
    <Text
      style={{
        fontSize: 16, 
        textAlign: 'center', 
        color: colors.textPrimary
      }}
    >
      { children }
    </Text>
  )
}
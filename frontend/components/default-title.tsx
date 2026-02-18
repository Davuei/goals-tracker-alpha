import { colors } from "@/constants/colors"
import { Text } from "react-native"

interface DefaultTitleProps {
  children: string
}

export function DefaultTitle({ children }: DefaultTitleProps) {
  return (
    <Text
      style={{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: colors.textPrimary
      }}
    >
      { children }
    </Text>
  )
}
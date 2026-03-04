import { colors } from "@/constants/colors"
import { Text } from "react-native"

interface DefaultSecondaryTextProps {
  underline?: boolean,
  children: string
}

export function DefaultSecondaryText({ underline = false, children }: DefaultSecondaryTextProps) {
  return (
    <Text
      style={{
        fontSize: 14, 
        textAlign: 'center', 
        color: colors.textSecondary, 
        textDecorationLine: underline ? 'underline' : 'none'
      }}
    >
      { children }
    </Text>
  )
}
import { colors } from "@/constants/colors"
import { Text } from "react-native"

interface DefaultTextProps {
  textColor: 'white' | 'dark', 
  children: string 
}

export function DefaultText({ textColor, children }: DefaultTextProps) {
  return (
    <Text
      style={{
        fontSize: 16, 
        textAlign: 'center', 
        color: textColor == 'white' ? colors.textPrimary : colors.textPrimaryDark
      }}
    >
      { children }
    </Text>
  )
}
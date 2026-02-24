import { colors } from "@/constants/colors"
import { Text } from "react-native"

interface DefaultTitleProps {
  titleColor: 'white' | 'dark', 
  children: string
}

export function DefaultTitle({ titleColor, children }: DefaultTitleProps) {
  return (
    <Text
      style={{
        fontSize: 24, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: titleColor == 'white' ? colors.textPrimary : colors.textPrimaryDark
      }}
    >
      { children }
    </Text>
  )
}
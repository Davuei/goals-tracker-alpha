import { colors } from "@/constants/colors";
import { Text } from "react-native"

interface DefaultLabelProps {
  labelColor: 'dark' | 'white'; 
  children: string
}

export function DefaultLabel({ labelColor, children }: DefaultLabelProps) {
  return (
    <Text
      style={{
        fontSize: 14, 
        color: labelColor == 'dark' ? colors.textPrimaryDark : colors.textPrimary
      }}
    >
      { children }
    </Text>
  )
}
import { colors } from "@/constants/colors";
import { Text } from "react-native";

interface ErrorMessageComponentProps {
  children: string
}

export function ErrorMessageComponent({ children }: ErrorMessageComponentProps) {
  return (
    <Text
      style={{
        color: colors.textAlert
      }}
    >
      { children }
    </Text>
  )
}
import { colors } from "@/constants/colors";
import { Link, LinkProps } from "expo-router";
import { Text } from "react-native";

interface LinkComponentProps extends LinkProps {
  children: string
}

export function LinkComponent({ href, children }: LinkComponentProps) {
  return (
    <Link 
      href={ href }
    >
      <Text 
        style={{
          fontSize: 16, 
          textAlign: 'center', 
          color: colors.textSecondary, 
          textDecorationLine: 'underline'
        }}
      >
        { children }
      </Text>
    </Link>
  )
}
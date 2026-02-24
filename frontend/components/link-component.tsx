import { colors } from "@/constants/colors"
import { Link, LinkProps } from "expo-router"
import { Text } from "react-native"
import { DefaultSecondaryText } from "./default-secondary-text"

interface LinkComponentProps extends LinkProps {
  children: string
}

export function LinkComponent({ href, children }: LinkComponentProps) {
  return (
    <Link 
      href={ href }
    >
      <DefaultSecondaryText underline>
        { children }
      </DefaultSecondaryText>
    </Link>
  )
}
import { colors } from "@/constants/colors"
import { Link, LinkProps } from "expo-router"
import { Text, View } from "react-native"

interface NavFooterBtnProps extends LinkProps {
  icon: React.ReactNode, 
  children: string
}

export function NavFooterBtn({ icon, children, href }: NavFooterBtnProps) {
  return (
    <Link href={ href }>
      <View
        style={{
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column'
        }}
      >
        { icon }

        <Text 
          style={{
            fontSize: 10, 
            color: colors.textSecondary, 
            textAlign: 'center'
          }}
        >
          { children }
        </Text>
      </View>
    </Link>
  )
}
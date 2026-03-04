import { colors } from "@/constants/colors"
import { Link, LinkProps } from "expo-router"
import { Text, View } from "react-native"

interface NavFooterButtonProps extends LinkProps {
  icon: React.ReactNode; 
  children: string
}

export function NavFooterButton({ icon, href, children }: NavFooterButtonProps) {
  return (
    <Link href={ href } replace>
      <View
        style={{
          paddingVertical: 2, 
          paddingHorizontal: 12, 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column', 
          borderRadius: 20
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
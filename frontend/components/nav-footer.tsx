import { colors } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NavFooterButton } from "./nav-footer-button"
import { usePathname } from "expo-router"

export function NavFooter() {

  const insets = useSafeAreaInsets()

  const pathname = usePathname()

  return (
    <View
      style={{
        height: 48 + insets.bottom, 
        paddingVertical: 8, 
        justifyContent: 'space-around', 
        flexDirection: 'row', 

        backgroundColor: colors.backgroundDark, 

        borderTopWidth: 1, 
        borderTopColor: colors.backgroundLight
      }}
    >

      <NavFooterButton 
        href={'/home'}
        icon={ 
          <Ionicons 
            name='home-sharp' 
            size={ 24 } 
            color={ pathname == '/home' ? colors.greenScales.green100 : colors.backgroundLight } 
          /> 
        }  
      >
        Home
      </NavFooterButton>

      <NavFooterButton
        href={'/profile'} 
        icon={
          <Ionicons
            name='person' 
            size={ 24 } 
            color={ pathname == '/profile' ? colors.greenScales.green100 : colors.backgroundLight }
          />
        }
      >
        Perfil
      </NavFooterButton>
    </View>
  )
}
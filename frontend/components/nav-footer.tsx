import { colors } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NavFooterBtn } from "./nav-footer-btn"
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

      <NavFooterBtn 
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
      </NavFooterBtn>

      <NavFooterBtn
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
      </NavFooterBtn>
    </View>
  )
}
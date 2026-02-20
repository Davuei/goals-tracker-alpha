import { colors } from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LinkComponent } from "./link-component"
import { NavFooterBtn } from "./nav-footer-btn"

export function NavFooter() {

  const insets = useSafeAreaInsets()

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
        icon={ <Ionicons name='home-sharp' size={ 24 } color={ colors.greenScales.green100 } /> }  
      >
        Home
      </NavFooterBtn> 

      <Ionicons name='person' size={ 24 } color={ colors.backgroundLight } />
    </View>
  )
}
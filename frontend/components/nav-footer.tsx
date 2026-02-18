import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export function NavFooter() {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        height: 48 + insets.bottom, 
        paddingVertical: 16, 
        justifyContent: 'space-around', 
        flexDirection: 'row', 

        backgroundColor: colors.backgroundDark, 

        borderTopWidth: 1, 
        borderTopColor: colors.backgroundLight
      }}
    >
      <Ionicons name='home-sharp' size={ 24 } color={ colors.backgroundLight } />
      <Ionicons name='person' size={ 24 } color={ colors.backgroundLight } />
    </View>
  )
}
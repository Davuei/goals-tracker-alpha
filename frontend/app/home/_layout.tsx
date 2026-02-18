import { NavFooter } from "@/components/nav-footer";
import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack 
          screenOptions={{ 
            title: 'Home', 
            headerStyle: { backgroundColor: colors.backgroundDark }, 
            headerTintColor: colors.textPrimary, 
            headerTitleStyle: { fontWeight: 'bold' }
          }} 
        />
      </View>

      <NavFooter />
    </View>
  )
}
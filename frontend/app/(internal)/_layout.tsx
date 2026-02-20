import { NavFooter } from "@/components/nav-footer";
import { colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function InternalLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.backgroundDark }, 
            headerTintColor: colors.textPrimary, 
            headerTitleStyle: { fontWeight: 'bold' }, 
          }}
        >
          <Stack.Screen name='home' options={{ title: 'Home' }} />
          <Stack.Screen name='profile' options={{ title: 'Perfil' }} />
        </Stack>
      </View>

      <NavFooter />
    </View>
  )
}
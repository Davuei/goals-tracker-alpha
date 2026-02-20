import { colors } from "@/constants/colors";
import { Stack } from "expo-router";

export default function ExternalLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundDark }, 
        headerTintColor: colors.textPrimary, 
        headerTitleStyle: { fontWeight: 'bold' }, 
      }}
    >
      <Stack.Screen name='login' options={{ title: 'Login' }} />
      <Stack.Screen name='signup' options={{ title: 'Registrar' }} />
    </Stack>
  )
}
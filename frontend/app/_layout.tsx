import { colors } from "@/constants/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.backgroundDark },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
      }} 
    >
      <Stack.Screen name='index' options={{ title: 'Login' }} />
      <Stack.Screen name='signup/index' options={{ title: 'Cadastro' }} />
      <Stack.Screen name='home' options={{ headerShown: false }} />
    </Stack> 
  )
}

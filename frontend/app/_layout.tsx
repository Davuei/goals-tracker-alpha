import { colors } from "@/constants/colors"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import Toast from 'react-native-toast-message'

const colorsTheme = {
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors, 
    background: colors.backgroundDark
  }
}

export default function RootLayout() {
  return (
    <ThemeProvider value={ colorsTheme }>
      <Stack
        screenOptions={{
          headerShown: false, 
        }} 
      >
        <Stack.Screen name='(external)' />
        <Stack.Screen name='(internal)' />
      </Stack>

      <Toast />
    </ThemeProvider>
  )
}

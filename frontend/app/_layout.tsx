import { colors } from "@/constants/colors"
import { AuthenticationContext, AuthenticationProvider } from "@/contexts/authentication-context"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Stack, useRouter, useSegments } from "expo-router"
import { useContext, useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
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
      <AuthenticationProvider>
        <RouteGuard />
        <Toast />
      </AuthenticationProvider>
    </ThemeProvider>
  )
}

function RouteGuard() {
  const { user, isLoading } = useContext(AuthenticationContext)
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if(isLoading) return

    const inInternalScreen = segments[0] == '(internal)'

    if(!user && inInternalScreen)
      router.replace('/login')
    else if(user && !inInternalScreen)
      router.replace('/home')
  }, [user, isLoading, segments])

  if(isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.backgroundDark }}>
        <ActivityIndicator size='large' color={ colors.greenScales.green200 } />
      </View>
    )
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, 
      }} 
    >
      <Stack.Screen name='(external)' />
      <Stack.Screen name='(internal)' />
    </Stack>
  )
}

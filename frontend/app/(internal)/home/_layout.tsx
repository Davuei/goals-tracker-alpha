import { colors } from '@/constants/colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext(Navigator)

export default function HomeTabsLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: colors.greenScales.green100, 
        tabBarInactiveTintColor: colors.textPrimary, 
        tabBarIndicatorStyle: { backgroundColor: colors.greenScales.green100 }, 
        tabBarStyle: { backgroundColor: colors.backgroundDark }
      }}
    >
      <MaterialTopTabs.Screen name='active' options={{ title: 'Ativas' }} />
      <MaterialTopTabs.Screen name='expired' options={{ title: 'Encerradas' }} />
    </MaterialTopTabs>
  )
}
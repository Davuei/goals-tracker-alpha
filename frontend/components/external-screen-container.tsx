import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface ExternalScreenContainerProps {
  children: React.ReactNode
}

export function ExternalScreenContainer({ children }: ExternalScreenContainerProps) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        width: '100%', 
        height: '100%', 
        paddingBottom: insets.bottom, 
        justifyContent: 'space-evenly', 
        alignItems: 'center', 
        gap: 28
      }}
    >
      { children }
    </View>
  )
}
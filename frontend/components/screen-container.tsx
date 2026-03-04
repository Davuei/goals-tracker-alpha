import { colors } from "@/constants/colors";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: React.ReactNode
}

export function ScreenContainer({ children }: ScreenContainerProps) {
  const insets = useSafeAreaInsets()

  return (
    <View 
      style={{
        flex: 1, 
        backgroundColor: colors.backgroundDark 
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}

        behavior='padding'
      >
        <ScrollView
          style={{
            paddingHorizontal: 20, 
            flex: 1, 
          }}

          contentContainerStyle={{ 
            flexGrow: 1, 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}

          keyboardShouldPersistTaps='handled'
          keyboardDismissMode='on-drag'

          showsVerticalScrollIndicator={ false }
        >
          { children }
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
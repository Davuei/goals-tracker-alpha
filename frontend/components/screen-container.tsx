import { colors } from "@/constants/colors";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps {
  scrollable?: boolean, 
  children: React.ReactNode
}

export function ScreenContainer({ scrollable = false, children }: ScreenContainerProps) {
  if(scrollable) {
    return (
      <SafeAreaView style={ styles.safeArea }>
        <KeyboardAvoidingView 
          style={ styles.keyboardAvoidingView } 
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
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={ styles.safeArea }>
      <KeyboardAvoidingView
        style={ styles.keyboardAvoidingView }
        behavior='padding'
      >
        <View
          style={{
            paddingHorizontal: 20, 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center'
          }} 
        >
          { children }
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 

    backgroundColor: colors.backgroundDark
  }, 
  keyboardAvoidingView: {
    flex: 1
  }
})
import { colors } from "@/constants/colors";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";

interface ScreenContainerProps {
  scrollable?: boolean, 
  children: React.ReactNode
}

export function ScreenContainer({ scrollable = false, children }: ScreenContainerProps) {
  if(scrollable) {
    return (
      <View style={ styles.viewContainer }>
        <KeyboardAvoidingView 
          style={ styles.keyboardAvoidingView } 
          behavior='height'
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

  return (
    <View style={ styles.viewContainer }>
      <KeyboardAvoidingView
        style={ styles.keyboardAvoidingView }
        behavior='height'
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
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1, 

    backgroundColor: colors.backgroundDark
  }, 
  keyboardAvoidingView: {
    flex: 1
  }
})
import { colors } from "@/constants/colors"
import { Modal, Pressable, StyleSheet, View } from "react-native"
import { DefaultTitle } from "./default-title"
import { DefaultText } from "./default-text"
import { DefaultPressable } from "./default-pressable"
import Animated, { Keyframe, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface DefaultModalProps {
  title: string, 
  text: string, 
  textColor?: 'white' | 'dark', 
  confirmText: string, 
  closeText: string, 
  isOpen: boolean, 
  onConfirm: () => void, 
  onClose: () => void, 
  children?: React.ReactNode
}

export function DefaultModal({ 
  title, 
  text, 
  textColor = 'dark', 
  confirmText, 
  closeText, 
  isOpen, 
  onConfirm, 
  onClose, 
  children
}: DefaultModalProps) {

  const AnimatedBackground = Animated.createAnimatedComponent(Pressable)

  const fadeIn = new Keyframe({
    0: {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }, 
    100: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
  }).duration(200).delay(200)

  const fadeOut = new Keyframe({
    0: {
      backgroundColor:'rgba(0, 0, 0, 0.4)'
    }, 
    100: {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
  }).duration(200)

  return (
    <Modal
      animationType='slide' 
      transparent 
      visible = { isOpen }
      onRequestClose={ onClose }
    >
      <AnimatedBackground
        style={ styles.viewBackground }

        entering={ fadeIn } 
        exiting={ fadeOut } 

        onPress={ onClose }
      >
        <View
          style={ styles.viewBottomSheet }

          onStartShouldSetResponder={() => true}
        >
          <DefaultTitle titleColor='dark'>
            { title }
          </DefaultTitle>

          <DefaultText textColor='dark'>
            { text }
          </DefaultText>

          <View
            style={ styles.viewChildren }
          >
            { children }
          </View>

          <View
            style={ styles.viewButtons }
          >
            <DefaultPressable style='filled' format='long' onPress={ onConfirm } textColor={ textColor }>
              { confirmText }
            </DefaultPressable>

            <DefaultPressable style='hollow' format='long' onPress={ onClose }>
              { closeText }
            </DefaultPressable>
          </View>
        </View>
      </AnimatedBackground>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewBackground: {
    flex: 1, 
    justifyContent: 'flex-end'
  }, 
  viewBottomSheet: {
    paddingHorizontal: 20, 
    paddingVertical: 40, 

    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 16, 

    backgroundColor: colors.backgroundLight, 

    borderTopLeftRadius: 24, 
    borderTopRightRadius: 24
  }, 
  viewChildren: {
    width: '100%'
  }, 
  viewButtons: {
    width: '100%', 

    backgroundColor: colors.backgroundLight, 

    flexDirection: 'column', 
    gap: 12
  }
})
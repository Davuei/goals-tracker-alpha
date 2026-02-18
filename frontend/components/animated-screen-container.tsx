import Animated, { Keyframe } from "react-native-reanimated"

interface AnimatedScreenContainerProps {
  children: React.ReactNode
}

export function AnimatedScreenContainer({ children }: AnimatedScreenContainerProps) {
  const fadeInView = new Keyframe({
      0: {
        opacity: 0, 
        transform: [{ translateY: -30 }]
      }, 
      100: {
        opacity: 1, 
        transform: [{ translateY: 0 }]
      }
    }).duration(400)
  
    const fadeOutView = new Keyframe({
      0: {
        opacity: 1, 
        transform: [{ translateY: 0 }]
      }, 
      100: {
        opacity: 0, 
        transform: [{ translateY: -30 }]
      }
    }).duration(400)
  
    return (
      <Animated.View
        style={{ 
          width: '100%', 
          height: '100%', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'transparent'
        }}
  
        entering={ fadeInView }
        exiting={ fadeOutView }
      >
        { children }
      </Animated.View>
    )
}
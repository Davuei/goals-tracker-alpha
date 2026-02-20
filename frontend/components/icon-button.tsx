import { DefaultAnimatedPressable, DefaultAnimatedPressableProps } from "./default-animated-pressable";


export function IconButton({ style, format, onPress, children }: DefaultAnimatedPressableProps) {
  return (
    <DefaultAnimatedPressable style={ style } format={ format } onPress={ onPress }>
      { children }
    </DefaultAnimatedPressable>
  )
}
import { DefaultAnimatedPressable, DefaultAnimatedPressableProps } from "./default-animated-pressable";
import { DefaultAnimatedPressableText } from "./default-animated-pressable-text";

export function DefaultPressable({ style, format, onPress,  children }: DefaultAnimatedPressableProps) {
  return (
    <DefaultAnimatedPressable style={ style } format={ format } onPress={ onPress }>
      <DefaultAnimatedPressableText style={ style }>
        { children }
      </DefaultAnimatedPressableText>
    </DefaultAnimatedPressable>
  )
}
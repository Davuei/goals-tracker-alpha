import { DefaultAnimatedPressable, DefaultAnimatedPressableProps } from "./default-animated-pressable";
import { DefaultAnimatedPressableText } from "./default-animated-pressable-text";

interface DefaultPressableProps extends DefaultAnimatedPressableProps {
  textColor?: 'white' | 'dark'
}

export function DefaultPressable({ 
  style, 
  textColor = 'dark', 
  format, 
  onPress, 
  setDisabled=false, 
  children 
}: DefaultPressableProps) {
  return (
    <DefaultAnimatedPressable style={ style } format={ format } onPress={ onPress } setDisabled={ setDisabled }>
      <DefaultAnimatedPressableText style={ style } textColor={ textColor }>
        { children }
      </DefaultAnimatedPressableText>
    </DefaultAnimatedPressable>
  )
}
import { colors } from "@/constants/colors";
import { Control, Controller } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { ErrorMessageComponent } from "./error-message-component";
import { DefaultLabel } from "./default-label";

interface VisualInputProps {
  label: string; 
  onPress: () => void;
  children: string; 

  control: Control<any>; 
  inputName: string; 
  error?: any
}

export function VisualInput({ label, onPress, children, control, inputName, error }: VisualInputProps) {
  return (
    <View style={ styles.view }>
      <View style={ styles.viewLabel }>
        <DefaultLabel labelColor='white'>
          { label }
        </DefaultLabel>

        {
          error && (
            <ErrorMessageComponent>
              { error.message }
            </ErrorMessageComponent>
          )
        }
      </View>

      <Controller
        control={ control } 
        name={ inputName } 
        rules={{ required: '* Data inválida' }}
        render={() => (
          <Pressable 
            style={ styles.pressable }
            onPress={ onPress }
          >
            <Text style={ styles.textDate }>
              { children }
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%', 

    flexDirection: 'column', 
    gap: 4
  }, 
  viewLabel: {
    width: '100%', 
    flexDirection: 'row', 
    gap: 8
  }, 
  textDate: {
    fontSize: 16, 
    color: colors.textPrimary
  }, 
  pressable: {
    width: '100%', 

    borderBottomWidth: 2, 
    borderBottomColor: colors.greenScales.green200
  }
})
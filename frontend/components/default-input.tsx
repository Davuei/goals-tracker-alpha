import { colors } from "@/constants/colors";
import { useState } from "react";
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { ErrorMessageComponent } from "./error-message-component";

interface DefaultInputProps extends TextInputProps {
  label: string; 
  keyboardType: 'default' | 'email-address' | 'numeric' | 'number-pad'; 
  isPasswordInput?: boolean; 

  control: Control<any>; 
  inputName: string; 
  validateOpt?: object; 
  error?: any
}

export function DefaultInput({ 
  label, 
  keyboardType, 
  isPasswordInput = false, 
  control, 
  inputName, 
  validateOpt, 
  error, 
  ...props 
}: DefaultInputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <View style={ styles.viewContainer }>
      <View style={ styles.viewLabel }>
        <Text style={ styles.text }>
          { label }
        </Text>

        { 
          error && (
            <ErrorMessageComponent>
              { error.message }
            </ErrorMessageComponent>
          ) 
        }
      </View>

      <Controller 
        control={control} 
        name={ inputName } 
        rules={ validateOpt } 
        render={({ field: { onChange, value } }) => (
          <TextInput 
            style={[ 
              styles.textInput, 
              isFocused && styles.focusedTextInput
            ]} 

            keyboardType={ keyboardType } 
            secureTextEntry={ isPasswordInput } 
            autoCapitalize={ isPasswordInput ? 'none' : 'sentences' } 
            autoCorrect={ !isPasswordInput } 
            autoComplete='off' 

            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}

            onBlur={(e) => {
              setIsFocused(false) 
              props.onBlur?.(e)
            }}

            onChangeText={ onChange } 

            value={ value }

            { ...props }
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%', 
  }, 
  viewLabel: {
    width: '100%', 
    flexDirection: 'row', 
    gap: 8
  }, 
  text: {
    color: colors.textPrimary
  }, 
  textInput: {
    width: '100%', 
    paddingHorizontal: 8, 

    fontSize: 14, 
    color: colors.textPrimary, 
    
    backgroundColor: 'transparent', 

    borderColor: colors.greenScales.green100, 
    borderWidth: 2, 
    borderRadius: 8
  }, 
  focusedTextInput: {
    borderColor: colors.greenScales.green200
  }
})
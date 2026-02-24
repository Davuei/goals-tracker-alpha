import { colors } from "@/constants/colors";
import { useState } from "react";
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { ErrorMessageComponent } from "./error-message-component";

interface DefaultInputProps extends TextInputProps {
  label: string; 
  textColor?: 'dark' | 'white' 
  keyboardType: 'default' | 'email-address' | 'numeric' | 'number-pad'; 
  isPasswordInput?: boolean; 

  control: Control<any>; 
  inputName: string; 
  validateOpt?: object; 
  error?: any
}

export function DefaultInput({ 
  label, 
  textColor = 'white', 
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
        <Text style={{ color: textColor == 'dark' ? colors.backgroundDark : colors.backgroundLight }}>
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
              {color: textColor == 'dark' ? colors.textPrimaryDark : colors.textPrimary }, 
              styles.textInput, 
              isFocused && styles.focusedTextInput
            ]} 

            keyboardType={ keyboardType } 
            secureTextEntry={ isPasswordInput } 
            autoCapitalize={ (isPasswordInput || keyboardType == 'email-address') ? 'none' : 'sentences' } 
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
  textInput: {
    width: '100%', 
    paddingHorizontal: 12, 

    fontSize: 14, 
    
    backgroundColor: 'transparent', 

    borderColor: colors.greenScales.green200, 
    borderWidth: 2, 
    borderRadius: 8
  }, 
  focusedTextInput: {
    borderColor: colors.greenScales.green100, 
    borderRadius: 16
  }
})
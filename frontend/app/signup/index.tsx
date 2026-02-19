import { DefaultInput } from "@/components/default-input";
import { DefaultPressable } from "@/components/default-pressable";
import { DefaultText } from "@/components/default-text";
import { DefaultTitle } from "@/components/default-title";
import { LinkComponent } from "@/components/link-component";
import { ScreenContainer } from "@/components/screen-container";
import { NewUser } from "@/models/user.model";
import { createUser } from "@/services/user-service.service";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

export default function SignUp() {
  const { control, handleSubmit, watch, getValues, formState: { errors } } = useForm<NewUser>()

  const confirmPassword = watch('password')

  const handleSubmitSignUp = async (data: NewUser) => {
    const resp = await createUser(data)

    console.log('resp: ', resp)
  }

  return (
    <ScreenContainer>
      <View
        style={{
          width: '100%', 
          height: '100%', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 28
        }}
      >
        <View
          style={{
            width: '100%', 
            gap: 12
          }}
        >
          <DefaultTitle>
            Crie uma conta!
          </DefaultTitle>

          <DefaultText>
            Com uma conta, suas metas ficam salvas online, sem risco de perdê-las!
          </DefaultText>
        </View>

        <View
          style={{
            width: '100%', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 16
          }}
        >
          <DefaultInput 
            label='Nome de usuário' 
            keyboardType='default' 

            control={ control } 
            inputName='name' 
            validateOpt={{ required: '* Nome obrigatório' }} 
            error={ errors.name }
          />

          <DefaultInput 
            label='E-mail' 
            keyboardType='email-address' 

            control={ control } 
            inputName='email' 
            validateOpt={{ required: '* E-mail obrigatório' }} 
            error={ errors.email }
          />

          <DefaultInput 
            label='Senha' 
            keyboardType='default' 

            control={ control } 
            inputName='password' 
            validateOpt={{ required: '* Senha obrigatória' }} 
            error={ errors.password } 

            isPasswordInput
          />

          <DefaultInput 
            label='Confirmar senha' 
            keyboardType='default' 

            control={ control } 
            inputName='confirmPassword' 
            validateOpt={{ required: '* Senha obrigatória' }} 
            error={ getValues('password') != confirmPassword && '* As senhas devem ser iguais' } 

            isPasswordInput
          />

          <DefaultPressable 
            style='filled' 
            onPress={handleSubmit(handleSubmitSignUp)}
          >
            Cadastrar-se
          </DefaultPressable>
        </View>

        <View>
          <DefaultText>
            Ao criar uma conta você concorda com nossos
          </DefaultText>

          <LinkComponent href={'./'}>
            Termos de Uso e Políticas de Privacidade
          </LinkComponent>
        </View>

      </View>
    </ScreenContainer>
  )
}
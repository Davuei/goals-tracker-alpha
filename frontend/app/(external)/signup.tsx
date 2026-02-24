import { DefaultInput } from "@/components/default-input";
import { DefaultPressable } from "@/components/default-pressable";
import { DefaultText } from "@/components/default-text";
import { DefaultTitle } from "@/components/default-title";
import { LinkComponent } from "@/components/link-component";
import { ScreenContainer } from "@/components/screen-container";
import { NewUser } from "@/models/user.model";
import { createUser } from "@/services/user-service.service";
import { toastWrapper } from "@/utils/toast-wrapper";
import { useRouter } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";

export default function SignUp() {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<NewUser>()

  const confirmPassword = watch('password')

  const router = useRouter()

  const handleSubmitSignUp: SubmitHandler<NewUser> = async (data) => {
    const resp = await createUser(data)

    if(resp.status == 200 || resp.status == 201) {
      toastWrapper.success('Usuário criado!', resp.message)
      router.replace('/login')
    } else
      toastWrapper.error('Erro ao criar usuário', resp.message)
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
          <DefaultTitle titleColor='white'>
            Crie uma conta!
          </DefaultTitle>

          <DefaultText textColor='white'>
            Com uma conta, suas metas ficam salvas online, sem risco de perdê-las!
          </DefaultText>
        </View>

        <View
          style={{
            width: '100%', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 20
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
            validateOpt={{ 
              required: '* Senha obrigatória', 
              validate: (value: string) => value === confirmPassword || '* As senhas devem ser iguais'
            }} 
            error={ errors.confirmPassword } 

            isPasswordInput
          />

          <DefaultPressable 
            style='filled' 
            format='long' 
            onPress={handleSubmit(handleSubmitSignUp)}
          >
            Cadastrar-se
          </DefaultPressable>
        </View>

        <View>
          <DefaultText textColor='white'>
            Ao criar uma conta você concorda com nossos
          </DefaultText>

          <LinkComponent href={'/login'}>
            Termos de Uso e Políticas de Privacidade
          </LinkComponent>
        </View>

      </View>
    </ScreenContainer>
  )
}
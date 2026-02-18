import { AnimatedScreenContainer } from "@/components/animated-screen-container";
import { DefaultInput } from "@/components/default-input";
import { DefaultPressable } from "@/components/default-pressable";
import { DefaultText } from "@/components/default-text";
import { DefaultTitle } from "@/components/default-title";
import { LinkComponent } from "@/components/link-component";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, View } from "react-native";

export default function Index() {

  const router = useRouter()

  const { control, handleSubmit, formState: { errors } } = useForm()

  const handleSubmitLogin = (data: any) => {
    Alert.alert('Dados recebidos: ', JSON.stringify(data))
  }

  return (
    <ScreenContainer>
      <AnimatedScreenContainer>
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
              Bem-vindo!
            </DefaultTitle>

            <DefaultText>
              Faça login com seu e-mail e senha ou entre sem criar uma conta.
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
              isPasswordInput 

              control={ control } 
              inputName='password' 
              validateOpt={{ required: '* Senha obrigatória', minLength: {value: 4, message: '* Mínimo de 4 caracteres'} }} 
              error={ errors.password }
            />

            <DefaultPressable 
              style='filled'
              onPress={ handleSubmit(handleSubmitLogin) }
            >
              Entrar
            </DefaultPressable>

            <DefaultPressable
              onPress={ () => { router.push('./signup') } }
            >
              Cadastrar-se
            </DefaultPressable>
          </View>

          <LinkComponent href={'./home'}>
            Entrar sem conta
          </LinkComponent>
        </View>
      </AnimatedScreenContainer>
    </ScreenContainer>
  )
}

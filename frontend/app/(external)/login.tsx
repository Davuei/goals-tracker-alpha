import { AnimatedScreenContainer } from "@/components/animated-screen-container";
import { DefaultInput } from "@/components/default-input";
import { DefaultModal } from "@/components/default-modal";
import { DefaultPressable } from "@/components/default-pressable";
import { DefaultSecondaryText } from "@/components/default-secondary-text";
import { DefaultText } from "@/components/default-text";
import { DefaultTitle } from "@/components/default-title";
import { ExternalScreenContainer } from "@/components/external-screen-container";
import { ScreenContainer } from "@/components/screen-container";
import { colors } from "@/constants/colors";
import { successStatusCodes } from "@/constants/status-codes";
import { AuthenticationContext } from "@/contexts/authentication-context";
import { LoginData } from "@/models/user.model";
import { loginUser } from "@/services/user-service.service";
import { toastWrapper } from "@/utils/toast-wrapper";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
  const { signIn } = useContext(AuthenticationContext)

  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginData>()
  
  const [showGuestModal, setShowGuestModal] = useState<boolean>(false)

  const insets = useSafeAreaInsets()

  const router = useRouter()

  const handleSwitchShowGuestModal = () => setShowGuestModal((prevState) => !prevState)

  const handleEnterGuestMode = async () => {
    setShowGuestModal(false)
    await signIn('', {id: '', email: '', name: ''})
  }

  const handleSubmitLogin: SubmitHandler<LoginData> = async (data) => {
    const resp = await loginUser(data)

    if(successStatusCodes.includes(resp.status)) {
      await signIn(resp.token, resp.user)
      toastWrapper.success('Login realizado com sucesso!', resp.message)
    } else
      toastWrapper.error('Erro ao fazer login', resp.message)
  }

  return (
    <ScreenContainer scrollable>
      <AnimatedScreenContainer>
        <ExternalScreenContainer>
            <View
              style={{
                width: '100%', 
                gap: 12
              }}
            >
              <DefaultTitle titleColor='white'>
                Bem-vindo!
              </DefaultTitle>

              <DefaultText textColor='white'>
                Faça login com seu e-mail e senha ou entre sem criar uma conta.
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
                validateOpt={{ 
                  required: '* Senha obrigatória', 
                  minLength: {value: 3, message: '* Mínimo de 3 caracteres'} 
                }} 
                error={ errors.password }
              />

              <DefaultPressable 
                style='filled' 
                format='long' 
                onPress={ handleSubmit(handleSubmitLogin) } 
                setDisabled={ isSubmitting }
              >
                Entrar
              </DefaultPressable>

              <DefaultPressable 
                style='hollow' 
                format='long' 
                onPress={ () => { router.push('/signup') } }
              >
                Cadastrar-se
              </DefaultPressable>
            </View>

            <Pressable onPress={ handleSwitchShowGuestModal }>
              <DefaultSecondaryText underline>
                Entrar sem conta
              </DefaultSecondaryText>
            </Pressable>

            <DefaultModal 
              title='Entrar como convidado?' 
              text='Usuários no modo convidado salvam seus dados localmente. Crie uma conta para salvar seus dados online ou sincronizar os dados locais.' 
              textColor='white' 
              confirmText='Continuar sem conta' 
              closeText='Voltar' 
              isOpen={ showGuestModal } 
              onConfirm={ handleEnterGuestMode } 
              onClose={ handleSwitchShowGuestModal }
            />
        </ExternalScreenContainer>
      </AnimatedScreenContainer>
    </ScreenContainer>
  )
}

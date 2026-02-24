import { DefaultText } from "@/components/default-text";
import { LogoutButton } from "@/components/logout-button";
import { ScreenContainer } from "@/components/screen-container";

export default function Profile() {
  return (
    <ScreenContainer>
      <DefaultText textColor='white'>
        Profile works!
      </DefaultText>

      <LogoutButton />
    </ScreenContainer>
  )
}
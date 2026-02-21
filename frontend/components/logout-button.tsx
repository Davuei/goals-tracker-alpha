import { colors } from "@/constants/colors";
import { AuthenticationContext } from "@/contexts/authentication-context";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable } from "react-native";

export function LogoutButton() {
  const { signOut } = useContext(AuthenticationContext)

  return (
    <Pressable
      onPress={ signOut }
    >
      <Ionicons name='log-out-outline' size={ 32 } color={ colors.backgroundLight } />
    </Pressable>
  )
}
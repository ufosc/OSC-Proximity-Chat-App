import React from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { LogInEmailInput, LogInPasswordInput } from "../Common/CustomInputs";
import LogInButton from "../Common/LogInButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { appSignOut } from "../../services/store";

const SignOutButton = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-ExtraBold": require("../../../assets/fonts/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("../../../assets/fonts/Gilroy-Light.otf"),
  });

  const onHandleSubmit = async () => {
    const response = await appSignOut();
    if (response?.user === null) {
      router.replace("/");
    } else if (response?.error) {
      console.log(response.error);
    }
  }

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return(
    <TouchableOpacity style={styles.main_button} onPress={onHandleSubmit}>
      <Text style={styles.button_text}>Sign Out</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  main_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },

  button_text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  }

})

export default SignOutButton;
import React from "react";
import { useFonts } from "expo-font";
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
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
    backgroundColor: "red",
    height: Dimensions.get("window").height * 0.05,
    marginTop: Dimensions.get("window").height * 0.005,
    borderRadius: 5,
    padding: 5
  },

  button_text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  }

})

export default SignOutButton;
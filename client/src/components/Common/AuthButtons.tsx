import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { router, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { appSignOut } from "../../services/store";

// Interface for props function onPress
interface LogInButtonProps {
  onPress?: () => void;
}

export const LogInButton: React.FC<LogInButtonProps> = ({ onPress }) => {

  const [fontsLoaded, fontError] = useFonts({
    'Gilroy-ExtraBold': require('../../../assets/fonts/Gilroy-ExtraBold.otf'),
    'Gilroy-Light': require('../../../assets/fonts/Gilroy-Light.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>Log In</Text>
    </TouchableOpacity>
  );
};

export const SignOutButton = () => {
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
    <TouchableOpacity style={styles.sign_out_button} onPress={onHandleSubmit}>
      <Text style={styles.button_text}>Sign Out</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  button_text: {
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
    fontSize: Dimensions.get("window").height * 0.03,

  },
  sign_out_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: Dimensions.get("window").height * 0.05,
    marginTop: Dimensions.get("window").height * 0.005,
    borderRadius: 5,
    padding: 5
  }
});


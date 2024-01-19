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
} from "react-native";
import { LogInEmailInput, LogInPasswordInput} from "../Common/CustomInputs";
import LogInButton from "../Common/LogInButton";

const LoginScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-ExtraBold": require("../../../assets/fonts/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("../../../assets/fonts/Gilroy-Light.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // Logo
    // Let's ge you started!

    // Email
    // Password
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.main_container}>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>Welcome back!</Text>
          </View>
          <View style={styles.input_container}>
            <LogInEmailInput />
            <LogInPasswordInput />
          </View>
          <View style={styles.button_container}>
            <LogInButton />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>

    // Log In

    // Make an account with Google (TEMP)
  );
};

const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  input_container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    height: Dimensions.get("window").height * 0.15,
  },

  button_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderColor: "blue",
    borderWidth: 1,
  },

  header_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: "green",
    borderWidth: 1,
  },

  header_text: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 30,
  },
});

export default LoginScreen;

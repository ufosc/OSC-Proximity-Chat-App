import React, { useEffect } from "react";
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
import { SignUpEmailInput, SignUpPasswordInput, SignUpConfirmPasswordInput } from "../Common/CustomInputs";
import SignUpButton from "../Common/SignUpButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { appSignUp } from "../../services/store";

const SignUpScreen = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-ExtraBold": require("../../../assets/fonts/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("../../../assets/fonts/Gilroy-Light.otf"),
  });

  const { inputEmail } = useLocalSearchParams();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");


  const onHandleSubmit = async () => {
    Keyboard.dismiss();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const response = await appSignUp(email, password);

    if (response?.user) {
      router.replace("(home)/chatchannel");
    } else if (response?.error) {
      console.log(response.error);
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.main_container}>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>Welcome!</Text>
          </View>
          <View style={styles.input_container}>
            <SignUpEmailInput
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <SignUpPasswordInput
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <SignUpConfirmPasswordInput
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>
          <View style={styles.button_container}>
            <SignUpButton onPress={onHandleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    height: Dimensions.get("window").height * 0.2,
    marginBottom: 20,
  },

  button_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },

  header_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  header_text: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 30,
  },
});

export default SignUpScreen;

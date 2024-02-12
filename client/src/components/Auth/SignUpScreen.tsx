import React, { useEffect} from "react";
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
import { AuthenticationErrorMessage, AuthenticationResponse } from "./AuthenticationResponse";
import { useLocalSearchParams, useRouter } from "expo-router";
import { appSignUp } from "../../services/store";
import {ErrorMessage} from "../Common/ErrorMessage";


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
  const [errorVisible, setErrorVisible] = React.useState<('none' | 'flex' | undefined)>("none");
  const [errorText, setErrorText] = React.useState<string>("")
  const clearForm = () => {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
  }

  const [authResponse, setAuthResponse] = React.useState<AuthenticationResponse>();
  
  const onHandleSubmit = async () => {
    Keyboard.dismiss();
    setAuthResponse(await appSignUp(email, password));
      
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      setErrorVisible("flex");
      setErrorText("Error: Passwords do not match")
      clearForm();
      return;
    }

    if (authResponse?.user) {

      router.replace("(home)/chatchannel");
    } else if (authResponse?.error) {
      clearForm();
      setErrorVisible("flex");
      const reg = /invalid-email/;
      const reg2 = /email-already-in-use/;
      if(reg.test(JSON.stringify(authResponse.error))) {
        setErrorText("Error: Invalid Email");
      } else if(reg2.test(JSON.stringify(authResponse.error))){
        setErrorText("Error: Email already in use");
      } else {
        setErrorText("Error: Password should be at least 6 characters");
      }
      console.log(authResponse.error);
    } 
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
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
            </View>
            <View style={styles.button_container}>
              <SignUpButton onPress={onHandleSubmit} />
            </View> 
          </View>
          <ErrorMessage visible={errorVisible} text={errorText}/>
        </KeyboardAvoidingView>
      </View>
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

  error_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    bottom: Dimensions.get("window").height * 0.10,
    position: "absolute",
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
  errorText: {
    color: "red", 
    justifyContent: "center",
  }
});

export default SignUpScreen;

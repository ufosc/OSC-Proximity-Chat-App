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
  TouchableOpacity,
} from "react-native";
import { LogInEmailInput, LogInPasswordInput } from "../Common/CustomInputs";
import { LogInButton } from "../Common/AuthButtons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { appSignIn } from "../../services/store";
import { AuthenticationErrorMessage, AuthenticationResponse } from "./AuthenticationResponse";

const LoginScreen = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Bold": require("../../../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../../../assets/fonts/Quicksand-Medium.ttf"),
  });

  const { inputEmail } = useLocalSearchParams();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [authResponse, setAuthResponse] = React.useState<AuthenticationResponse>();
  const [invalidLogin, invalidateLogin] = React.useState<boolean>(false); // Possbily change this?

  // Sign in function with email and password
  const onHandleSubmit = async () => {
    Keyboard.dismiss();
    setAuthResponse(await appSignIn(email, password));
  };

  // Listens for the response from the sign in function
  useEffect(() => {
    if (authResponse?.user) {
      router.replace("(home)/chatchannel");
    } else if (authResponse?.error) {
      console.log(authResponse.error);
      invalidateLogin(true);
    }
  }, [authResponse])

  useEffect(() => {
    setEmail(inputEmail?.toString() || ""); // On load of the page, set the email to the inputEmail if they entered it!
  }, []);

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
              <Text style={styles.header_text}>Welcome back!</Text>
              <Text style={styles.subheader_text}>How have you been?</Text>
            </View>
            <View style={styles.input_container}>
              <LogInEmailInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                invalid={invalidLogin}
              />
              <LogInPasswordInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                invalid={invalidLogin}
              />
            </View>
            <View style={styles.button_container}>
              <LogInButton onPress={onHandleSubmit} />
            </View>
            <TouchableOpacity>
              <Text style={[styles.regular_text, {textDecorationLine: 'underline'}]}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.horizontal_line} />
                <View>
                  <Text style={[styles.regular_text, {marginHorizontal: 10}]}>Or Log In With</Text>
                </View>
              <View style={styles.horizontal_line} />
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.error_container}>
          <AuthenticationErrorMessage response={authResponse} onPress={() => {
            setAuthResponse(undefined)
            invalidateLogin(false)
            }} />
        </View>

      </View>
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
    padding: Dimensions.get("window").width * 0.11,
    backgroundColor: "white",
    gap: Dimensions.get("window").height * 0.025,
  },

  //This is an example of where the error message could be
  error_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    bottom: Dimensions.get("window").height * 0.10,
    position: "absolute",
  },

  input_container: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.15,
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
    alignItems: "flex-start",
    width: "100%",
    marginVertical: Dimensions.get("window").height * 0.03,
  },

  header_text: {
    fontFamily: "Quicksand-Bold",
    fontSize: 37,
  },
  subheader_text: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
  },
  regular_text: {
    fontFamily: "Quicksand-Medium",
    color: "#8E8E8E",
  },
  horizontal_line: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E',
  },
});

export default LoginScreen;

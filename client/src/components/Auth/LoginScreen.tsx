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
import { LogInEmailInput, LogInPasswordInput } from "../Common/CustomInputs";
import LogInButton from "../Common/LogInButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { appSignIn } from "../../services/store";

const LoginScreen = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-ExtraBold": require("../../../assets/fonts/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("../../../assets/fonts/Gilroy-Light.otf"),
  });

  const { inputEmail } = useLocalSearchParams();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onHandleSubmit = async () => {
    const response = await appSignIn(email, password);
    if (response?.user) {
      router.replace("(home)/chatchannel");
    } else if (response?.error) {
      console.log(response.error);
    }
  };

  useEffect(() => {
    setEmail(inputEmail?.toString() || ""); // On load of the page, set the email to the inputEmail if they entered it!
  }, []);

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
            <Text style={styles.header_text}>Welcome back!</Text>
          </View>
          <View style={styles.input_container}>
            <LogInEmailInput
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <LogInPasswordInput
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.button_container}>
            <LogInButton onPress={onHandleSubmit} />
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
    alignItems: "center",
    width: "100%",
  },

  header_text: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 30,
  },
});

export default LoginScreen;

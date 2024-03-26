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
import { EmailInput, PasswordInput } from "../Common/CustomInputs";
import { LogInButton, ExternalLoginButton } from "../Common/AuthButtons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { appSignIn } from "../../services/store";
import {
  AuthenticationErrorMessage,
  AuthenticationResponse,
} from "./AuthenticationResponse";
import { ArrowLeftCircle } from "react-native-feather";

const LoginScreen = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Bold": require("../../../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Medium": require("../../../assets/fonts/Quicksand-Medium.ttf"),
  });

  const { inputEmail } = useLocalSearchParams();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [authResponse, setAuthResponse] =
    React.useState<AuthenticationResponse>();
  const [invalidLogin, invalidateLogin] = React.useState<boolean>(false); // Possbily change this?

  const externalLoginIcons = {
    google: require("../../../assets/google_logo.png"),
    facebook: require("../../../assets/facebook_logo.png"),
    apple: require("../../../assets/apple_logo.png"),
  };

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
  }, [authResponse]);

  useEffect(() => {
    setEmail(inputEmail?.toString() || ""); // On load of the page, set the email to the inputEmail if they entered it!
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    console.log("Google Sign In");
  };

  const handleFacebookSignIn = async () => {
    console.log("Facebook Sign In");
  };

  const handleAppleSignIn = async () => {
    console.log("Apple Sign In");
  };

  const handleGithubSignIn = async () => {
    console.log("Github Sign In");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.main_container}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.back_button}
          >
            <ArrowLeftCircle
              color={"black"}
              strokeWidth={1.4}
              width={34}
              height={34}
            />
          </TouchableOpacity>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>Welcome back!</Text>
            <Text style={styles.subheader_text}>How have you been?</Text>
          </View>
          <View style={styles.input_container}>
            <EmailInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              invalid={invalidLogin}
            />
            <PasswordInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              invalid={invalidLogin}
            />
          </View>
          <View style={styles.button_container}>
            <LogInButton onPress={onHandleSubmit} />
          </View>
          <TouchableOpacity>
            <Text
              style={[styles.regular_text, { textDecorationLine: "underline" }]}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.divider_container}>
            <View style={styles.horizontal_line} />
            <View>
              <Text style={[styles.regular_text, { marginHorizontal: 10 }]}>
                Or Login With
              </Text>
            </View>
            <View style={styles.horizontal_line} />
          </View>

          <View style={styles.externalLinkContainer}>
            <ExternalLoginButton
              onPress={handleGoogleSignIn}
              companyName="google"
            />
            <ExternalLoginButton
              onPress={handleAppleSignIn}
              companyName="apple"
            />
            <ExternalLoginButton
              onPress={handleFacebookSignIn}
              companyName="facebook"
            />
            <ExternalLoginButton
              onPress={handleGithubSignIn}
              companyName="github"
            />
          </View>
          <View style={styles.footer_text_container}>
            <Text style={styles.footer_text}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => router.replace({ pathname: "/signup" })}
            >
              <Text
                style={[
                  styles.footer_text,
                  { color: "#5dbea3", textDecorationLine: "underline" },
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.error_container}>
          <AuthenticationErrorMessage
            response={authResponse}
            onPress={() => {
              setAuthResponse(undefined);
              invalidateLogin(false);
            }}
          />
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.11,
    paddingVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: "white",
    gap: Dimensions.get("window").height * 0.029,
  },

  //This is an example of where the error message could be
  error_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    top: Dimensions.get("window").height * 0.1,
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
    marginBottom: Dimensions.get("window").height * 0.019,
    marginTop: Dimensions.get("window").height * 0.23,
  },

  header_text: {
    fontFamily: "Quicksand-Bold",
    fontSize: 37,
    marginBottom: Dimensions.get("window").height * 0.01,
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
    backgroundColor: "#8E8E8E",
  },
  externalLinkContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  footer_text: {
    fontFamily: "Quicksand-Bold",
    color: "black",
    fontSize: 15,
  },
  footer_text_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 7,
    flex: 1,
    paddingBottom: Dimensions.get("window").height * 0.01,
  },
  divider_container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Dimensions.get("window").height * 0.011,
  },
  back_button: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.075,
    left: Dimensions.get("window").width * 0.075,
  },
});

export default LoginScreen;

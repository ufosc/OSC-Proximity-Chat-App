import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { ArrowLeftCircle } from "react-native-feather";

import LargeTextButton from "../../components/auth/LargeTextButton";

import { ExternalAuthButton } from "../../components/auth/AuthButtons";
import {
  AuthenticationErrorMessage,
  AuthenticationResponse,
  CustomError,
} from "../../components/auth/AuthenticationResponse";
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "../../components/common/CustomInputs";
import { appSignUp } from "../../services/AuthStore";

const SignUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [authResponse, setAuthResponse] =
    React.useState<AuthenticationResponse>();
  //grays out password on password error
  const [invalidPassword, invalidatePassword] = React.useState<boolean>(false);
  //grays out email on email error
  const [invalidEmail, invalidateEmail] = React.useState<boolean>(false);

  const onHandleSubmit = async () => {
    Keyboard.dismiss();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      const nonmatching_password_error: AuthenticationResponse = {
        error: new CustomError("Invalid password", "Passwords do not match"),
      };
      invalidatePassword(true);
      setAuthResponse(nonmatching_password_error);

      return;
    }

    setAuthResponse(await appSignUp(email, password));

    if (authResponse?.user) {
      console.log("User Logged IN!");
    } else if (authResponse?.error) {
      console.log(authResponse.error);
    }
  };

  const handleGoogleSignUp = async () => {
    console.log("Google Sign Up");
  };

  const handleFacebookSignIn = async () => {
    console.log("Facebook Sign Up");
  };

  const handleAppleSignUp = async () => {
    console.log("Apple Sign Up");
  };

  const handleGithubSignUp = async () => {
    console.log("Github Sign Up");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <View style={styles.main_container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back_button}>
            <ArrowLeftCircle
              color="black"
              strokeWidth={1.4}
              width={34}
              height={34}
            />
          </TouchableOpacity>
          <View style={styles.header_container}>
            <Text style={styles.header_text}>Join the conversation</Text>
            <Text style={styles.subheader_text}>Talk to people near you</Text>
          </View>
          <View style={styles.input_container}>
            <EmailInput
              value={email}
              onChangeText={(text) => {
                invalidateEmail(false);
                setEmail(text);
              }}
              invalid={invalidEmail}
            />
            <PasswordInput
              value={password}
              onChangeText={(text) => {
                invalidatePassword(false);
                setPassword(text);
              }}
              invalid={invalidPassword}
            />
            <ConfirmPasswordInput
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              invalid={invalidPassword}
            />
          </View>
          <View style={styles.button_container}>
            <LargeTextButton onPress={onHandleSubmit} buttonText="Sign Up" />
          </View>

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
            <ExternalAuthButton
              onPress={handleGoogleSignUp}
              companyName="google"
            />
            <ExternalAuthButton
              onPress={handleAppleSignUp}
              companyName="apple"
            />
            <ExternalAuthButton
              onPress={handleFacebookSignIn}
              companyName="facebook"
            />
            <ExternalAuthButton
              onPress={handleGithubSignUp}
              companyName="github"
            />
          </View>
          <View style={styles.footer_text_container}>
            <Text style={styles.footer_text}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Log In", { newEmail: "" })}>
              <Text
                style={[
                  styles.footer_text,
                  { color: "#5dbea3", textDecorationLine: "underline" },
                ]}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.error_container}>
          <AuthenticationErrorMessage
            response={authResponse}
            onPress={() => setAuthResponse(undefined)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    gap: Dimensions.get("window").height * 0.02,
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
    marginTop: Dimensions.get("window").height * 0.17,
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

export default SignUpScreen;

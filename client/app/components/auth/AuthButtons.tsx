import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  ImageSourcePropType,
} from "react-native";

import { appSignOut } from "../../services/AuthStore";

interface SignOutButtonProps {}

export const SignOutButton: React.FC<SignOutButtonProps> = () => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: async () => {
            setLoading(true);
            const response = await appSignOut();
            setLoading(false);

            if (response?.user === null) {
              console.log("Sign out successful");
            } else if (response?.error) {
              console.log(response.error);
              Alert.alert(
                "Sign Out Failed",
                "An error occurred during sign out. Please try again.",
              );
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity
      style={styles.sign_out_button}
      onPress={handleSignOut}
      disabled={loading}>
      <Text style={styles.button_text}>SIGN OUT</Text>
    </TouchableOpacity>
  
  );
};

export const LogInButton: React.FC<{ onPress?: () => void }> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.login_button} onPress={onPress}>
      <Text style={styles.button_text}>Login</Text>
    </TouchableOpacity>
  );
};

export const SignUpButton: React.FC<{ onPress?: () => void }> = ({
  onPress,
}) => {

  return (
    <TouchableOpacity style={styles.login_button} onPress={onPress}>
      <Text style={styles.button_text}>Sign Up</Text>
    </TouchableOpacity>
  );
};

export const ExternalAuthButton: React.FC<{
  onPress?: () => void;
  companyName: string;
  imageSource?: ImageSourcePropType;
}> = ({ onPress, companyName, imageSource }) => {
  const images: { [key: string]: ImageSourcePropType } = {
    google: require("../../../assets/icons/auth/google_logo.png"),
    apple: require("../../../assets/icons/auth/apple_logo.png"),
    github: require("../../../assets/icons/auth/github_logo.png"),
    facebook: require("../../../assets/icons/auth/facebook_logo.png"),
  };

  const clicked = () => {
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={clicked} style={styles.external_login_button}>
      <Image
        style={styles.login_logo}
        source={
          images[companyName] ||
          require("../../../assets/icons/expo/adaptive-icon.png")
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  login_button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Dimensions.get("window").height / 2,
    shadowColor: "#8E8E8E",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  button_text: {
    color: "white",
    fontFamily: "Quicksand-Medium",
    fontSize: Dimensions.get("window").height * 0.027,
  },
  sign_out_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: Dimensions.get("window").height * 0.05,
    marginTop: Dimensions.get("window").height * 0.3,
    borderRadius: 8,
    padding: 5,
  },
  external_login_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: Dimensions.get("window").height * 0.068,
    width: Dimensions.get("window").height * 0.068,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#8E8E8E",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#8E8E8E",
  },
  login_logo: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
  },
});

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
  sign_out_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: Dimensions.get("window").height * 0.05,
    marginTop: Dimensions.get("window").height * 0.01,
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

import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions, Alert, Image, View, ImageSourcePropType } from "react-native";
import { router, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { appSignOut } from "../../services/store";

interface SignOutButtonProps {}

export const SignOutButton: React.FC<SignOutButtonProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Gilroy-ExtraBold": require("../../../assets/fonts/Gilroy-ExtraBold.otf"),
    "Gilroy-Light": require("../../../assets/fonts/Gilroy-Light.otf"),
  });

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
              router.replace("/");
            } else if (response?.error) {
              console.log(response.error);
              Alert.alert("Sign Out Failed", "An error occurred during sign out. Please try again.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.sign_out_button} onPress={handleSignOut} disabled={loading}>
        <Text style={styles.button_text}>Sign Out</Text>
    </TouchableOpacity>
  );
};

export const LogInButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const [fontsLoaded, fontError] = useFonts({
    'Gilroy-ExtraBold': require('../../../assets/fonts/Gilroy-ExtraBold.otf'),
    'Gilroy-Light': require('../../../assets/fonts/Gilroy-Light.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>Login</Text>
    </TouchableOpacity>
  );
};

export const ExternalLoginButton: React.FC<{ onPress?: () => void; imageSource: string  }> = ({ onPress, imageSource }) => {

  const image = require(imageSource);

  return (
    <View style={styles.external_login_button}>
      <TouchableOpacity  onPress={onPress}>
        <Image 
        style={styles.login_logo}
        source={image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Dimensions.get("window").height / 2,
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
    marginTop: Dimensions.get("window").height * 0.01,
    borderRadius: 8,
    padding: 5,
  },
  external_login_button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: Dimensions.get("window").height * 0.076,
    width: Dimensions.get("window").height * 0.076,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#8E8E8E",
    shadowRadius: 2,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },
  login_logo: {
    resizeMode: "contain",
    height: "100%",
  },
});

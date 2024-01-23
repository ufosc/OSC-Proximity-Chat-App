import { router } from "expo-router";
import React from "react";
import { useFonts } from "expo-font";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

// Interface for props function onPress
interface LogInButtonProps {
  onPress?: () => void;
}

const LogInButton: React.FC<LogInButtonProps> = ({ onPress }) => {

  const [fontsLoaded, fontError] = useFonts({
    'Gilroy-ExtraBold': require('../../../assets/fonts/Gilroy-ExtraBold.otf'),
    'Gilroy-Light': require('../../../assets/fonts/Gilroy-Light.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>Log In</Text>
    </TouchableOpacity>
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
    borderRadius: 10,
  },

  button_text: {
    color: "white",
    fontFamily: "Gilroy-ExtraBold",
    fontSize: Dimensions.get("window").height * 0.03,

  },
});

export default LogInButton;

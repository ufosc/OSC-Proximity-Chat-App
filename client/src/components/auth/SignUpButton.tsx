import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import { SignUpButtonProps } from "../../types/Props";

const SignUpButton: React.FC<SignUpButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>Sign Up</Text>
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

export default SignUpButton;

import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import { LargeTextButtonProps } from "../../types/Props";

const LargeTextButton: React.FC<LargeTextButtonProps> = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>{buttonText}</Text>
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
});

export default LargeTextButton;
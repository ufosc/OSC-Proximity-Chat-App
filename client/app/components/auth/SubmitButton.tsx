import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

import { SubmitButtonProps } from "../../types/Props";

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>Submit</Text>
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
    borderRadius: 100,
  },

  button_text: {
    color: "white",
    fontFamily: "Quicksand-Medium",
    fontSize: Dimensions.get("window").height * 0.027,
  },
});

export default SubmitButton;
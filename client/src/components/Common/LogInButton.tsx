import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

// Interface for props function onPress
interface LogInButtonProps {
  onPress?: () => void;
}

const LogInButton: React.FC<LogInButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}>Log In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  button_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.03,
    padding: 18,
  },
});

export default LogInButton;

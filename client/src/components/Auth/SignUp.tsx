import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import SignUpButton from "../Common/SignUpButton";
import LogInButton from "../Common/LogInButton";

const SignUp = () => {

  return (
    <View style={styles.container}>
      <View style={styles.button_container}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },

  button_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "25%",
    width: "100%",
  },
});

export default SignUp;

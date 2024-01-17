import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SignUp from "../components/Auth/SignUp";

const WelcomeScreen = () => {
  return <SignUp />;
};

const styles = StyleSheet.create({
    container: {
        color: "blue",
    }
});

export default WelcomeScreen;

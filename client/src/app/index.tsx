import React, { Fragment } from "react";
import { View, StyleSheet, Text, SafeAreaView, Platform } from "react-native";
import WelcomeScreen from "../components/Home/WelcomeScreen";
import LogIn from "../components/Auth/LoginScreen";
import ChatScreen from "../components/Chat/ChatScreen";
import { LinearGradient } from "expo-linear-gradient";
import SafeAreaWrapper from "../components/Common/SafeAreaWrapper";

const WelcomePage = () => {
  return (
    <SafeAreaWrapper>
      <ChatScreen />
    </SafeAreaWrapper>
  );
};

export default WelcomePage;

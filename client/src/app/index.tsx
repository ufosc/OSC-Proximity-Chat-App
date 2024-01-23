import React, { Fragment } from "react";
import { Button } from "react-native";
import SafeAreaWrapper from "../components/Common/SafeAreaWrapper";
import { router } from "expo-router";
import WelcomeScreen from "../components/Home/WelcomeScreen";

const EntryPage = () => {
  return (
    <SafeAreaWrapper>
      <WelcomeScreen />
    </SafeAreaWrapper>
  );
};

export default EntryPage;

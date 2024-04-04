import React from "react";
import WelcomeScreen from "../../components/home/WelcomeScreen";
import { router } from "expo-router";
import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";

const WelcomePage = () => {
  return (
    <SafeAreaWrapper>
      <WelcomeScreen />
    </SafeAreaWrapper>
  );
};

export default WelcomePage;

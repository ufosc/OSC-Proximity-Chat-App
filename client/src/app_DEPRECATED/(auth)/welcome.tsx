import React from "react";
import WelcomeScreen from "../../screens/auth/WelcomeScreen";
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

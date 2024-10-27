import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import DigitVerificationScreen from "../screens/auth/DigitVerificationScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Log In" component={LoginScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Digit Verification" component={DigitVerificationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

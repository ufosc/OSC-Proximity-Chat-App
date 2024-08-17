import React from "react";
import { Text } from "react-native";

// Navigation
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
// Services/Hooks/Styles
import { AuthStore } from "./services/AuthStore";
import { useGlobalFonts } from "./styles/fonts";

const App = () => {
  const { initialized, isLoggedin } = AuthStore.useState();
  const { fontsLoaded, fontError } = useGlobalFonts();

  if (!fontsLoaded && !fontError) return <Text>Error Loading Fonts!</Text>;

  if (!initialized) return <Text>Loading...</Text>;

  return (
    isLoggedin ? <AppNavigator /> : <AuthNavigator />
  );
};

export default App;

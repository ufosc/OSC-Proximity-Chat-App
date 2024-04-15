import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";

// Navigation
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
// Services/Hooks/Styles
import { AuthStore } from "./src/services/AuthStore";
import { useGlobalFonts } from "./src/styles/fonts";

const App = () => {
  const { initialized, isLoggedin } = AuthStore.useState();
  const { fontsLoaded, fontError } = useGlobalFonts();

  if (!fontsLoaded && !fontError) return <Text>Error Loading Fonts!</Text>;

  if (!initialized) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      {isLoggedin ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default App;

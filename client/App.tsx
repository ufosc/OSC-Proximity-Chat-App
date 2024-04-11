import React from "react";
import { StyleSheet, Text } from "react-native";
import { AuthStore } from "./src/services/AuthStore";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";


const App = () => {
  const { initialized, isLoggedin } = AuthStore.useState();

  if (!initialized) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      {isLoggedin ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

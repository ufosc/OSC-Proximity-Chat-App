import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AuthStore } from "./src/services/AuthStore";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "./src/components/home/WelcomeScreen";
import SignUpScreen from "./src/screens/auth/SignUpScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import ChatScreen from "./src/screens/chat/ChatScreen";
import SettingsScreen from "./src/screens/settings/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const { initialized, isLoggedin } = AuthStore.useState();

  if (!initialized) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      {isLoggedin ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={ChatScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={SignUpScreen} />
          <Stack.Screen name="Register" component={LoginScreen} />
        </Stack.Navigator>
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

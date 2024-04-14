import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { LocationProvider } from "../contexts/LocationContext";
import { SocketProvider } from "../contexts/SocketContext";
import { UserProvider } from "../contexts/UserContext";
import ChatScreen from "../screens/chat/ChatScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <UserProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Tab.Screen name="Home" component={ChatScreen} />
            <Tab.Screen name="Profile" component={SettingsScreen} />
          </Tab.Navigator>
        </UserProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AppNavigator;

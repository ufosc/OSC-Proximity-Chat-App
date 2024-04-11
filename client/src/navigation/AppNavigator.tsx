import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/chat/ChatScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { SocketProvider } from "../contexts/SocketContext";
import { LocationProvider } from "../contexts/LocationContext";
import { UserProvider } from "../contexts/UserContext";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <UserProvider>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={ChatScreen} />
            <Tab.Screen name="Profile" component={SettingsScreen} />
          </Tab.Navigator>
        </UserProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AppNavigator;

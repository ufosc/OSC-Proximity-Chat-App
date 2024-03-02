import React from "react";
import { Stack, Tabs } from "expo-router";
import { SettingsProvider } from "../../contexts/SettingsContext";
import { SocketProvider } from "../../contexts/SocketContext";
import { LocationProvider } from "../../contexts/LocationContext";
import { UserProvider } from "../../contexts/UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const AuthLayout = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <UserProvider>
          <SettingsProvider>
            <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
              <Tabs.Screen
                name="chatchannel"
                options={{
                  title: 'Chat',
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
              />
              <Tabs.Screen
                name="settings"
                options={{
                  title: 'Settings',
                  tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
              />
            </Tabs>
          </SettingsProvider>
        </UserProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AuthLayout;

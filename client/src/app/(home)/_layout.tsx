import React from "react";
import { Stack } from "expo-router";
import { SettingsProvider } from "../../contexts/SettingsContext";
import { SocketProvider } from "../../contexts/SocketContext";
import { LocationProvider } from "../../contexts/LocationContext";

const AuthLayout = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <SettingsProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="chatchannel" options={{}} />
          </Stack>
        </SettingsProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AuthLayout;

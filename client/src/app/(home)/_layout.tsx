import React from "react";
import { Stack } from "expo-router";
import { SettingsProvider } from "../../contexts/SettingsContext";
import { SocketProvider } from "../../contexts/SocketContext";
import { LocationProvider } from "../../contexts/LocationContext";
import { UserProvider } from "../../contexts/UserContext";

const AuthLayout = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <UserProvider>
          <SettingsProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="chatchannel" options={{}} />
            </Stack>
          </SettingsProvider>
        </UserProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AuthLayout;

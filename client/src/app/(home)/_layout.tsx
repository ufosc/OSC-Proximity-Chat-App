import React from "react";
import { Stack } from "expo-router";
import { SettingsProvider } from "../../contexts/SettingsContext";

const AuthLayout = () => {
  return (
    <SettingsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="chatchannel" options={{}} />
      </Stack>
    </SettingsProvider>
  );
};

export default AuthLayout;

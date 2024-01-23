import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false}}/>
        <Stack.Screen name="login" options={{ headerShown: false}}/>
        <Stack.Screen name="signup" options={{ headerShown: false}}/>
        <Stack.Screen name="resetpass" options={{ headerShown: false}}/>

    </Stack>
  )
}

export default PublicLayout
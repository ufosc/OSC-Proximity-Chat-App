import React from 'react'
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack screenOptions={{
        headerShown: false
    }}>

        <Stack.Screen name="chatchannel" options={{
        }} />
    </Stack>
  )
}

export default AuthLayout
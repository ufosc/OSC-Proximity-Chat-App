import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import { AuthStore } from "../services/store";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";

const App = () => {
  const { initialized, isLoggedin } = AuthStore.useState();
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key || !initialized) return;

    if (!isLoggedin) {
      router.replace("/welcome");
    } else if (isLoggedin) {
      router.replace("/chatchannel");
    }
  }, [segments, navigationState?.key, initialized]);

  return (
    <View>
      <Text>Loading screen</Text>
    </View>
  );
  // replace this div with one of the pages inside this directory (eg. ChatroomPage in chatchannel.tsx)
};

export default App;

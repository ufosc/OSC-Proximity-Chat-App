import React, { useEffect, createContext, useState, useContext } from "react";
import { View, Text } from "react-native";
import { AuthStore } from "../services/store";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";

export const SettingsContext = createContext({
  theme: 'light',
  isSendButtonDisabled: false,
  autoCorrect: true,
  autoCapitalize: 'none',
  headerBackgroundColor: '#98BF64'
});

const App = () => {
  const settings = useContext(SettingsContext);
  const { initialized, isLoggedin } = AuthStore.useState();
  const [theme, setTheme] = useState(settings.theme);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(settings.isSendButtonDisabled);
  const [autoCorrect, setAutoCorrect] = useState(settings.autoCorrect);
  const [autoCapitalize, setAutoCapitalize] = useState(settings.autoCapitalize);
  const [headerBackgroundColor, setHeaderBackgroundColor] = useState(settings.headerBackgroundColor);
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
    <SettingsContext.Provider value={{
      theme,
      isSendButtonDisabled,
      autoCorrect,
      autoCapitalize,
      headerBackgroundColor
    }}> 
    <View>
      <Text>Loading screen</Text>
    </View>
    </SettingsContext.Provider>
  );
  // replace this div with one of the pages inside this directory (eg. ChatroomPage in chatchannel.tsx)
};

export default App;

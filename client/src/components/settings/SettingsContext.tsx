import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Settings = {
  theme: string;
};

const SettingsContext = createContext<Settings | null>(null);

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const toggleTheme = async () => {
  try {
    const settings = await loadSettings();
    if (settings && settings.theme === "light") {
      await AsyncStorage.setItem("theme", "dark");
    } else {
      await AsyncStorage.setItem("theme", "light");
    }
  } catch (err) {
    console.error(err);
  }
}

export const loadSettings = async () => {
  try {
    const themeSetting = await AsyncStorage.getItem("theme");
    if (themeSetting !== null) {
      return {
        theme: themeSetting,
      };
    } else {
      await AsyncStorage.setItem("theme", "light");
      return {
        theme: "light",
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    (async () => {
        const settings = await loadSettings();
        if (settings) {
          setTheme(settings.theme);
        }
    })
  }, [theme]);

  return (
    <SettingsContext.Provider value={{theme}}>
      {children}
    </SettingsContext.Provider>
  );
};

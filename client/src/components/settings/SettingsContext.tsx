import React, { useState, useContext, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Settings = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsContext = createContext<Settings | null>(null);

export const useSettings = () => {
  return useContext(SettingsContext);
};

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
  } catch (error) {
    console.error(error);
  }
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    loadSettings().then((settings) => {
        if (settings) {
            setTheme(settings.theme);
        }
    })
  }, [theme]);

  return (
    <SettingsContext.Provider value={{theme, setTheme}}>
      {children}
    </SettingsContext.Provider>
  );
};

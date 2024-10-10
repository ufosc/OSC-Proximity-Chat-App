import React, { useState, useContext, createContext, useEffect } from "react";
import { loadTheme, saveTheme } from "@app/utils/storageUtils"; // Import utilities

type Settings = {
  theme: string;
  toggleTheme: () => void;
};

const SettingsContext = createContext<Settings | null>(null);

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<string>("light");

  // Initial settings load
  useEffect(() => {
    const initializeTheme = async () => {
      const savedTheme = await loadTheme();
      setTheme(savedTheme);
    };

    initializeTheme();
  }, []);

  // Toggle theme and update AsyncStorage
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await saveTheme(newTheme); // Save the new theme
  };

  return (
    <SettingsContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

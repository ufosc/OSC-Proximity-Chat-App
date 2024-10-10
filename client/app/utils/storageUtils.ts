import AsyncStorage from "@react-native-async-storage/async-storage";

// Utility to load theme from AsyncStorage
export const loadTheme = async (): Promise<string> => {
  try {
    const themeSetting = await AsyncStorage.getItem("theme");
    if (themeSetting !== null) {
      return themeSetting;
    } else {
      await AsyncStorage.setItem("theme", "light");
      return "light";
    }
  } catch (error) {
    console.error("Failed to load theme", error);
    return "light"; 
  }
};

// Utility to save theme to AsyncStorage
export const saveTheme = async (theme: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("theme", theme);
  } catch (error) {
    console.error("Failed to save theme", error);
  }
};

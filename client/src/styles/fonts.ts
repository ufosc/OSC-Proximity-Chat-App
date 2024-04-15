import { useFonts } from "expo-font";

// Add new fonts in here!
const fonts = {
  "Gilroy-ExtraBold": require("../../assets/fonts/Gilroy-ExtraBold.otf"),
  "Gilroy-Light": require("../../assets/fonts/Gilroy-Light.otf"),
  "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
  "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
};

export const useGlobalFonts = () => {
  const [fontsLoaded, fontError] = useFonts(fonts);
  return { fontsLoaded, fontError };
};

import React from "react";
import { useSettings } from "../../contexts/SettingsContext";
import { SafeAreaView, Platform, StyleSheet, StatusBar } from "react-native";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children }) => {
  const settings = useSettings();

  const mainSafeAreaProps = {
    ...styles.mainSafeArea,
    backgroundColor:
      settings && settings.theme != "light" ? "#191d20" : "white",
  };

  return Platform.OS === "ios" ? (
    <>
      <SafeAreaView style={mainSafeAreaProps}>{children}</SafeAreaView>
    </>
  ) : (
    <>
      <SafeAreaView style={styles.androidSafeArea}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    // May be used later to adjust the top safe area
    flex: 0,
  },
  mainSafeArea: {
    flex: 1,
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: "white", // Replace with your desired color
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default SafeAreaWrapper;

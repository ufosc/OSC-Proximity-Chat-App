import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function App() {
  return (
    <View>
      <Text>This Componenet is DEPRECATED.</Text>
      <Text>DO NOT TOUCH. THE NEW ENTRY POINT IS AT 'app/index.tsx'</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

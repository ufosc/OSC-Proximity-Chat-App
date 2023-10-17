import React from "react";
import { StyleSheet, View } from "react-native";
import ProximityChat from "./src/components/ProximityChat";

export default function App() {
  return (
    <View style={styles.container}>
      <ProximityChat />
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

import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import ProximityChat from "./src/components/ProximityChat";
import { SocketProvider } from "./src/constants/SocketContext";

export default function App() {
  return (
    <SocketProvider>
      <View style={styles.container}>
        {/* Replace Hello! with the proximity chat app */}
        <Text>Hello!</Text>
      </View>
    </SocketProvider>
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

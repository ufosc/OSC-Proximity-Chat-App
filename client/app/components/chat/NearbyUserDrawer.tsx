import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import NearbyHeader from "./NearbyHeader";
import { Pressable } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const NearbyUserDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const translateX = useSharedValue(SCREEN_WIDTH);

  const toggleDrawer = () => {
    translateX.value = isOpen
      ? withTiming(SCREEN_WIDTH, {
          duration: 300, // Duration in milliseconds
          easing: Easing.out(Easing.ease), // Smooth easing out
        })
      : withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.ease), // Smooth easing out
        });
    setIsOpen(!isOpen);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const nearbyUsers = ["Alice", "Bob", "Charlie", "Diana", "Eve"]; // Example names

  return (
    <View style={styles.container}>
      <NearbyHeader onClick={toggleDrawer} />
      {/* Overlay and Drawer */}
      {isOpen && <Pressable style={styles.overlay} onPress={toggleDrawer} />}
      <Animated.View style={[styles.drawer, animatedStyle]}>
        <Text style={styles.headerText}>Nearby Users</Text>
        <FlatList
          data={nearbyUsers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.name}>{item}</Text>}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: Dimensions.get("screen").height,
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    width: SCREEN_WIDTH * 0.6,
    height: "100%",
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 2,
    gap: 20,
  },
  headerText: {
    fontFamily: "Quicksand",
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default NearbyUserDrawer;

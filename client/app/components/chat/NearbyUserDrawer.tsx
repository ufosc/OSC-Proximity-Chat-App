import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import NearbyHeader from "./NearbyHeader";
import { Pressable } from "react-native";
import { UserProfile } from "@app/types/User";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface NearbyUserDrawerProps {
  nearbyUsers: { [uid: string]: UserProfile };
}

const NearbyUserDrawer: React.FC<NearbyUserDrawerProps> = ({ nearbyUsers }) => {
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

  return (
    <View style={styles.container}>
      <NearbyHeader onClick={toggleDrawer} nearbyUsers={nearbyUsers} />
      {/* Overlay and Drawer */}
      {isOpen && <Pressable style={styles.overlay} onPress={toggleDrawer} />}
      <Animated.View style={[styles.drawer, animatedStyle]}>
        <Text style={styles.headerText}>Nearby Users</Text>
        <FlatList
          data={Object.entries(nearbyUsers)}
          keyExtractor={(item, index) => item[0]}
          renderItem={({ item }) => {
            return (
              <View style= {{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}>
                <Image
                  style={{
                    height: Dimensions.get("window").height * 0.055,
                    width: Dimensions.get("window").height * 0.055,
                    borderRadius: 100,
                    marginRight: 12,
                  }}
                  source={require("../../../assets/icons/user/fake_pfp.jpg")}
                />
                <Text style={styles.name}>{item[1].displayName}</Text>
              </View>
            );
          }}
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

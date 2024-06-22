import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";

import { CounterProps } from "../../types/Props";

const NearbyCount: React.FC<CounterProps> = ({ count }) => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconAndCount}>
        <Image
          style={styles.iconImage}
          source={require("../../../assets/icons/misc/nearby_icon.png")}
        />
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconImage: {
    height: Dimensions.get("window").height * 0.025,
    width: Dimensions.get("window").height * 0.03,
  },
  iconContainer: {
    width: "50%",
  },
  iconAndCount: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  countText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "50%",
  },
});

export default NearbyCount;

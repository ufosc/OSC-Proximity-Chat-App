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
    tintColor: "white",
    height: Dimensions.get("window").height * 0.025,
    width: Dimensions.get("window").height * 0.03,
  },
  iconContainer: {
    width: "50%",
    marginRight: 35,
    marginTop: 18,
  },
  iconAndCount: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  countText: {
    fontFamily: "Quicksand",
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    width: "50%",
  },
});

export default NearbyCount;

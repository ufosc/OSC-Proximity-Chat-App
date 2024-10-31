import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import NearbyCount from "./NearbyCount";
import { CounterProps } from "../../types/Props";

export const NearbyHeader: React.FC<CounterProps> = ({ count }) => {
  return (
    <View style={styles.nearbyContainer}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("../../../assets/icons/arrow/angle-right.png")}
          style={styles.backArrow}
        />
        <Text style={styles.nearbyText}>Nearby</Text>
        <NearbyCount count={count} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nearbyContainer: {
    backgroundColor: "#34D1BF",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "black",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  nearbyText: {
    fontFamily: "Quicksand",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    height: 70,
    marginLeft: 110,
    marginRight: "auto",
    top: 18,
  },
  backArrow: {
    transform: "scale(-1)",
    height: 27,
    width: 10,
    tintColor: "white",
    position: "absolute",
    marginLeft: 33,
    top: 22,
  },
});

export default NearbyHeader;

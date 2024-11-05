import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { ChevronLeft } from "react-native-feather";

export const NearbyHeader: React.FC = () => {
  return (
    <View style={styles.nearbyContainer}>
      <ChevronLeft color="white" strokeWidth={1.4} width={40} height={40} />
      <Text style={styles.nearbyText}>Nearby</Text>
      <View style={styles.iconContainer}>
        <Image
          style={styles.peopleIcon}
          source={require("../../../assets/icons/misc/nearby_icon.png")}
        />
        <Text style={styles.countText}>{5}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nearbyContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#34D1BF",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    paddingVertical: 15,
    paddingRight: 25,
    paddingLeft: 10,
    gap: 10,
  },
  nearbyText: {
    fontFamily: "Quicksand",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginRight: "auto",
  },
  peopleIcon: {
    tintColor: "white",
    height: Dimensions.get("window").height * 0.025,
    width: Dimensions.get("window").height * 0.03,
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  countText: {
    fontFamily: "Quicksand",
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
});

export default NearbyHeader;

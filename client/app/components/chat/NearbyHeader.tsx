import { UserProfile } from "@app/types/User";
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

interface NearbyHeaderProps {
  onClick: () => void;
  nearbyUsers: { [uid: string]: UserProfile };
}

export const NearbyHeader: React.FC<NearbyHeaderProps> = ({ onClick, nearbyUsers }) => {
  return (
    <View style={styles.nearbyContainer}>
      <Text style={styles.nearbyText}>Nearby</Text>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.iconContainer}>
          <Text style={styles.countText}>{Object.keys(nearbyUsers).length}</Text>
          <Image
            style={styles.peopleIcon}
            source={require("../../../assets/icons/misc/nearby_icon.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nearbyContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#34D1BF",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    paddingVertical: 15,
    paddingRight: "5%",
    paddingLeft: "5%",
    gap: 10,
    zIndex: 1,
  },
  nearbyText: {
    fontFamily: "Quicksand",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
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
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontFamily: "Quicksand",
    fontSize: 20,
    paddingRight: "2%",
    fontWeight: "bold",
    color: "white",
  },
});

export default NearbyHeader;

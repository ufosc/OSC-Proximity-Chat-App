import React from "react";
import { useFonts } from "expo-font";
import {
  Text,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

type SettingsProps = {
  id: string;
  title: string;
  type: string;
  setter: Function;
  data: any;
};

// The component for a single setting item
// id: the id of the setting in the data object
// title: the string that will be shown on the left side of the setting
// setter: setter function for the setting value
// data: the object that contains the settings values
export const SettingsItem = ({
  id,
  title,
  type,
  setter,
  data,
}: SettingsProps) => (
  <View style={styles.rowWrapper}>
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.row}>
        <Text style={styles.rowTitle}>{title}</Text>
        {type === "toggle" && (
          <Switch
            onValueChange={(val) => {
              setter({ ...data, [id]: Boolean(val) });
            }} // Convert val to boolean using Boolean() function
            value={Boolean(data[id as keyof typeof data])} // Convert data[id] to boolean using Boolean() function
          />
        )}

        {type === "select" && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.rowValueText}>
              {data[id as keyof typeof data]}
            </Text>
            <Image
              source={require("../../../assets/icons/arrow/angle-right.png")}
              style={styles.rightArrow}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 22,
    height: 50,
    backgroundColor: "#fff",
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowTitle: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
  rowValueText: {
    marginRight: 5,
    color: "#616161",
    fontSize: 16,
  },
  rightArrow: {
    height: Dimensions.get("window").height * 0.024,
    width: Dimensions.get("window").height * 0.024,
    tintColor: "#616161",
  },
});
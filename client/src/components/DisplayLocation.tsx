import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  LocationGeocodedAddress,
  LocationObject,
} from "expo-location";

export default () => {
  const [location, setLocation] = useState<LocationObject>();
  const [address, setAddress] = useState<LocationGeocodedAddress[]>();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await getCurrentPositionAsync({});
      let address = await reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocation(location);
      setAddress(address);
    })();
  }, []);

  let coordsText = "Waiting...";
  if (errorMsg) {
    coordsText = errorMsg;
  } else if (location) {
    coordsText = `${location.coords.latitude}, ${location.coords.longitude}`;
  }

  let addressText = "Waiting...";
  if (errorMsg) {
    addressText = errorMsg;
  } else if (address) {
    addressText = `${address[0].streetNumber} ${address[0].street}`;
  }

  return (
    <View style={styles.container}>
      <Text>{coordsText}</Text>
      <Text>{addressText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

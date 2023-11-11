import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
  LocationGeocodedAddress,
  LocationObject,
} from "expo-location";
import { LocationContext } from "../constants/LocationContext";
import { UserContext } from "../constants/UserContext";
import { generateName, generateUniqueId } from "../constants/scripts";
import { MessageWrapper } from "./MessageWrapper";

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

  let coordsText = "";
  if (errorMsg) {
    coordsText = errorMsg;
  } else if (location) {
    coordsText = `${location.coords.latitude}, ${location.coords.longitude}`;
  }

  let addressText = "";
  if (errorMsg) {
    addressText = errorMsg;
  } else if (address) {
    addressText = `${address[0].streetNumber} ${address[0].street}`;
  }

  return (
    <View style={styles.container_wrapper}>
      <SafeAreaView>
        <UserContext.Provider
          value={{
            displayName: generateName(),
            userId: generateUniqueId().toString(),
            avatar: undefined,
          }}
        >
          <LocationContext.Provider
            value={{ location: location, address: address, errorMsg: errorMsg }}
          >
            <View style={styles.container}>
              <MessageWrapper />
            </View>
          </LocationContext.Provider>
        </UserContext.Provider>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  container_wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

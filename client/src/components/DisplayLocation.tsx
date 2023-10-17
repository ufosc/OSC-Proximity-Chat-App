import React from "react";
import { Text, View } from "react-native";
import { LocationContext } from "../constants/LocationContext";

export const DisplayLocation = () => {
  return (
    <LocationContext.Consumer>
      {(locationContext) => {
        return (
          <View>
            <Text>{JSON.stringify(locationContext.location)}</Text>
            <Text>{JSON.stringify(locationContext.address?.at(0))}</Text>
          </View>
        );
      }}
    </LocationContext.Consumer>
  );
};

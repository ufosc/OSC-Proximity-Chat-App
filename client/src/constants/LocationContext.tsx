import React from "react";
import { LocationGeocodedAddress, LocationObject } from "expo-location";

type LocationContextType = {
  location: LocationObject | undefined;
  address: LocationGeocodedAddress[] | undefined;
  errorMsg: string | undefined;
};

export const LocationContext = React.createContext<LocationContextType>({
  location: undefined,
  address: undefined,
  errorMsg: undefined,
});

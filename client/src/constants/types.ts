import { LocationGeocodedAddress, LocationObject } from "expo-location";

export type UserContextType = {
  displayName: string | undefined;
  userId: string | undefined;
  avatar: string | undefined;
};

export type LocationContextType = {
  location: LocationObject | undefined;
  address: LocationGeocodedAddress[] | undefined;
  errorMsg: string | undefined;
};

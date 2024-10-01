import * as Location from "expo-location";

// Permission Service to Handle Location Permissions
export const checkLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return false;
  }
  return true;
};

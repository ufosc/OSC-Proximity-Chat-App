import * as Location from "expo-location";

// Location Service to Handle Location Fetching
export const getLocation = async (): Promise<Location.LocationObject | null> => {
  try {
    return await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

// Permission Service to Handle Location Permissions
export const checkLocationPermission = async (): Promise<boolean> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return false;
  }
  return true;
};

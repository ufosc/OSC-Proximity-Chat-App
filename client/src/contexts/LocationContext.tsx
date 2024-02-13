import React, { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";
import { LOCATION_REFRESH_RATE } from "@env";

interface LocationContextProps {
  longitude: number;
  latitude: number;
  isLocationEnabled: boolean;
}

interface LocationType {
  longitude: number;
  latitude: number;
}

const LocationContext = createContext<LocationContextProps | null>(null);

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<LocationType>({
    latitude: 99999, // Impossible starting value
    longitude: 99999,
  });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      // Request location permissions, if not granted, return
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      setIsLocationEnabled(true);

      const interval = setInterval(async () => {
        try {
          let locationData = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          }); // High accuracy for now for testing!
          if (
            locationData.coords.latitude !== location.latitude ||
            locationData.coords.longitude !== location.longitude
          ) {
            setLocation({
              latitude: locationData.coords.latitude,
              longitude: locationData.coords.longitude,
            });
          } else {
            console.log("Location has not changed");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }, LOCATION_REFRESH_RATE); // Fetch location every 3 seconds

      // Cleanup function to clear interval when component unmounts
      return () => clearInterval(interval);
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        longitude: location.longitude,
        latitude: location.latitude,
        isLocationEnabled: isLocationEnabled,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

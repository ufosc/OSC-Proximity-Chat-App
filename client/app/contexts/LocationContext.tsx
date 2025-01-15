import { LOCATION_REFRESH_RATE } from "@env";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocation, checkLocationPermission } from "@app/services/LocationService";
import { LocationContextProps, LocationType } from "@app/types/Location";



// LocationContext Creation
const LocationContext = createContext<LocationContextProps | null>(null);

// Custom Hook for Consuming Location Context
export const useLocation = () => {
  return useContext(LocationContext);
};

var setLocationCallback: React.Dispatch<React.SetStateAction<LocationType>> | undefined = undefined;
export const forceRefreshLocation = async () => {
  if (setLocationCallback === undefined) return;
  const locationData = await getLocation();
  if (locationData && locationData.coords) {
    const { latitude, longitude } = locationData.coords;
    setLocationCallback({ lat: latitude, lon: longitude });
  }
}

// LocationProvider Component to Provide Location Context
export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<LocationType>({
    lat: 99999, // Impossible starting value
    lon: 99999,
  });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  setLocationCallback = undefined;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startLocationTracking = async () => {
      const hasPermission = await checkLocationPermission(); // Use permission service
      if (!hasPermission) return;

      setIsLocationEnabled(true);
      setLocationCallback = setLocation;

      // Set up the interval once after permission is granted
      interval = setInterval(async () => {
        const locationData = await getLocation();
        if (locationData && locationData.coords) {
          const { latitude, longitude } = locationData.coords;
          if (latitude !== location.lat || longitude !== location.lon) {
            setLocation({ lat: latitude, lon: longitude });
          } else {
            //console.log("Location has not changed");
          }
        }
      }, Number(LOCATION_REFRESH_RATE));
    };

    startLocationTracking();

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log("[LOG]: Cleaning up location useEffect");
      }
    };
  }, [location.lat, location.lon]);


  return (
    <LocationContext.Provider
      value={{
        lon: location.lon,
        lat: location.lat,
        isLocationEnabled,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

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

// LocationProvider Component to Provide Location Context
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
    let interval: NodeJS.Timeout;

    const startLocationTracking = async () => {
      const hasPermission = await checkLocationPermission(); // Use permission service
      if (!hasPermission) return;

      setIsLocationEnabled(true);

      // Set up the interval once after permission is granted
      interval = setInterval(async () => {
        const locationData = await getLocation(); 
        if (locationData && locationData.coords) {
          const { latitude, longitude } = locationData.coords;
          if (latitude !== location.latitude || longitude !== location.longitude) {
            setLocation({ latitude, longitude });
          } else {
            console.log("Location has not changed");
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
  }, []); 


  return (
    <LocationContext.Provider
      value={{
        longitude: location.longitude,
        latitude: location.latitude,
        isLocationEnabled,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

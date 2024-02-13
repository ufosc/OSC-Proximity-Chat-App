import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import * as Network from "expo-network";
import { useLocation } from "./LocationContext";
import { EXPO_IP } from "@env";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const locationContext = useLocation();

  useEffect(() => {
    let isMounted = true;

    const socketIo = io(`http://${EXPO_IP}:8080`); // Hardcoded IP address

    socketIo.on("connect", () => {
      if (isMounted) {
        setSocket(socketIo);
      } else {
        console.log("Socket not mounted");
      }
    });

    socketIo.on("message", (data: any) => {
      console.log("message", data);
    });

    return () => {
      isMounted = false;
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (
      socket &&
      locationContext?.latitude != 9999 &&
      locationContext?.longitude != 9999
    ) {
      console.log(
        "Sending location update to server:",
        locationContext?.latitude,
        locationContext?.longitude
      );
      socket.emit(
        "updateLocation",
        {
          lat: locationContext?.latitude,
          lon: locationContext?.longitude,
        },
        (ack: string) => {
          console.log("Location update ack:", ack);
        }
      );
    }
  }, [locationContext?.latitude, locationContext?.longitude]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

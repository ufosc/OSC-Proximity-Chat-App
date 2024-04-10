import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useLocation } from "./LocationContext";
import { EXPO_IP } from "@env";
import { AuthStore } from "../services/AuthStore";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mounted, setMounted] = useState(false);
  const locationContext = useLocation();

  useEffect(() => {
    const getToken = async () => {
      const token = await AuthStore.getRawState().userAuthInfo?.getIdToken();
      console.log("Token:", token);
      return token;
    };

    const initializeSocket = async () => {
      const token = await getToken();
      const socketIo = io(`http://${EXPO_IP}:8080`, {
        auth: {
          token: token,
        },
      });

      socketIo.connect();
      setSocket(socketIo);
      setMounted(true);
    };

    if (!mounted) {
      initializeSocket();
    }
    return () => {
      socket?.disconnect();
      console.log("[LOG]: Cleaning up intializeSocket useEffect");
    };
  }, []);

  // Listen to the socket state and run once the socket is set!
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      console.log("[LOG]: Cleaning up sockets and mounted state.");
      socket.disconnect();
      setSocket(null);
      setMounted(false);
    };
  }, [socket]);

  useEffect(() => {
    // TODO: Refactor this useEffect into a different file (service?) outside of the context, as it is not part of the purpose of a context.
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

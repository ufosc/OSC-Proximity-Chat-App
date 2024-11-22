import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useLocation } from "./LocationContext";
import { initializeSocket, getToken, updateLocation } from "@app/services/SocketService";


const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mounted, setMounted] = useState(false);
  const locationContext = useLocation();

  useEffect(() => {
    const initialize = async () => {
      const token = await getToken();
      if (token) {
        const socketIo = await initializeSocket(token);
        setSocket(socketIo);
        setMounted(true);
      }
    };

    if (!mounted) {
      initialize();
    }

    return () => {
      socket?.disconnect();
      console.log("[LOG]: Cleaning up initializeSocket useEffect");
    };
  }, [mounted]);

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
    if (
      socket &&
      locationContext &&
      locationContext?.lat !== 9999 &&
      locationContext?.lon !== 9999
    ) {
      updateLocation(socket, { lat: locationContext.lat, lon: locationContext.lon });
    }
  }, [locationContext?.lat, locationContext?.lon, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

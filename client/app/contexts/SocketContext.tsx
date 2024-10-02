import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { useLocation } from "./LocationContext";
import { initializeSocket, getToken, sendLocationUpdate } from "@app/services/SocketService";


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
      locationContext?.latitude !== 9999 &&
      locationContext?.longitude !== 9999
    ) {
      sendLocationUpdate(socket, locationContext.latitude, locationContext.longitude);
    }
  }, [locationContext?.latitude, locationContext?.longitude, socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

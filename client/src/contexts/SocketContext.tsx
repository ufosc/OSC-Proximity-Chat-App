import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import * as Network from 'expo-network';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (networkState.isConnected) {
          const ip = await Network.getIpAddressAsync();
          const socketIo = io(`http://${ip}:8080`); // Dynamically fetches and uses the IP address
          setSocket(socketIo);
        }
      } catch (error) {
        console.error('Could not get IP address:', error);
      }
    };

    fetchIP();
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

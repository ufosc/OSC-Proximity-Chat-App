import React, { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io("http://10.136.132.142:8080");
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

import { io, Socket } from "socket.io-client";
import { AuthStore } from "../services/AuthStore";
import { EXPO_IP } from "@env";

export const initializeSocket = async (token: string): Promise<Socket> => {
  const socketIo = io(`http://${EXPO_IP}:8080`, {
    auth: {
      token,
    },
  });

  socketIo.connect();
  return socketIo;
};


export const getToken = async (): Promise<string | null> => {
  const token = await AuthStore.getRawState().userAuthInfo?.getIdToken();
  console.log("Token:", token);
  return token ?? null;
};



export const sendLocationUpdate = (
  socket: Socket,
  latitude: number,
  longitude: number
) => {
  console.log("Sending location update to server:", latitude, longitude);
  socket.emit(
    "updateLocation",
    {
      lat: latitude,
      lon: longitude,
    },
    (ack: string) => {
      console.log("Location update ack:", ack);
    }
  );
};
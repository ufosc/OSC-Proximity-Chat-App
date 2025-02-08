import { io, Socket } from "socket.io-client";
import { AuthStore } from "../services/AuthStore";
import { SOCKET_IP, SOCKET_PORT } from "@env";
import { LocationType } from "@app/types/Location";
import { UserProfile } from "@app/types/User";
import { Completer } from "@app/utils/completer";
import { Message } from "@app/types/Message";
import { refreshNearbyUsers } from "@app/contexts/NearbyUserContext";

const socketUrl = `http://${SOCKET_IP}:${SOCKET_PORT}`;

export const initializeSocket = async (token: string): Promise<Socket> => {
  const socketIo = io(socketUrl, {
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


// Methods

export const updateLocation = (
  socket: Socket,
  location: LocationType,
) => {
  console.log("Sending location update to server:", location);
  socket.emit(
    "updateLocation",
    location,
    (ack: string) => {
      console.log("updateLocation ack:", ack);
      refreshNearbyUsers(socket);
    }
  );
};

export const getNearbyUsers = async (
  socket: Socket,
): Promise<{ [uid: string]: UserProfile }> => {
  const completer = new Completer<{ [uid: string]: UserProfile }>();

  socket.emit(
    "getNearbyUsers",
    (nearbyUsersMap: { [uid: string]: UserProfile }) => {
      completer.complete(nearbyUsersMap);
    }
  );

  return await completer.promise;
}

export const notifyUpdateProfile = (
  socket: Socket,
) => {
  socket.emit(
    "notifyUpdateProfile",
    (ack: string) => {
      console.log("notifyUpdateProfile ack:", ack);
    }
  )
}

export const sendMessage = (
  socket: Socket,
  message: Message,
) => {
  socket.emit("sendMessage", message,
    (ack: string) => {
      console.log("sendMessage ack:", ack);
    }
  );
}

//

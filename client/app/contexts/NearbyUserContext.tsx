import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "../types/User";
import { getNearbyUsers } from "@app/services/SocketService";
import { Socket } from "socket.io-client";

const NearbyUsersContext = createContext<{ [uid: string]: UserProfile }>({});

export const useNearbyUsers = () => {
  return useContext(NearbyUsersContext);
};

var setNearbyUsersCallback:
  | React.Dispatch<
      React.SetStateAction<{
        [uid: string]: UserProfile;
      }>
    >
  | undefined = undefined;
export const refreshNearbyUsers = async (socket: Socket) => {
  if (setNearbyUsersCallback === undefined) return;
  const nearbyUsers = await getNearbyUsers(socket);
  // console.log(nearbyUsers);
  setNearbyUsersCallback(nearbyUsers);
};

export const NearbyUsersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setNearbyUsers] = useState<{ [uid: string]: UserProfile }>({});
  setNearbyUsersCallback = setNearbyUsers;

  return (
    <NearbyUsersContext.Provider value={user}>
      {children}
    </NearbyUsersContext.Provider>
  );
};

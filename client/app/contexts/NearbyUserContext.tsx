import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "../types/User";

const NearbyUsersContext = createContext<{ [uid: string]: UserProfile }>({});

export const useNearbyUsers = () => {
  return useContext(NearbyUsersContext);
};

export const NearbyUsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setNearbyUsers] = useState<{ [uid: string]: UserProfile }>({});

  return <NearbyUsersContext.Provider value={user}>{children}</NearbyUsersContext.Provider>;
};

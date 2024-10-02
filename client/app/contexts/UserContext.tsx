import React, { createContext, useContext, useState } from "react";
import { UserType } from "../types/User";
import { initializeUser } from "@app/services/UserService";

const UserContext = createContext<UserType | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>(initializeUser); 

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

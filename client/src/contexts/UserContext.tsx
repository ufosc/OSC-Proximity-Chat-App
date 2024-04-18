import React, { createContext, useContext, useState } from "react";

import { UserType } from "../types/User";

const UserContext = createContext<UserType | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({
    displayName: "DefaultDisplayName",
    userIcon: {
      imagePath: "DefaultImagePath",
      colorHex: "#fff",
    },
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

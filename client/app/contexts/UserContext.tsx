import React, { createContext, useContext, useEffect, useState } from "react";

import { UserType } from "../types/User";
import { generateName } from "@app/utils/scripts";

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

  useEffect(() => {
    user.displayName = generateName()
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

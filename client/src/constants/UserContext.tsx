import React from "react";
import { UserContextType } from "./types";

export const UserContext = React.createContext<UserContextType>({
  displayName: undefined,
  userId: undefined,
  avatar: undefined,
});

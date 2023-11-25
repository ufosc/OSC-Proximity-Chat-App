import React from "react";
import { AppContextType, LocationContextType, UserContextType } from "./types";

export const AppContext = React.createContext<AppContextType>({
  user: undefined,
  location: undefined,
});

export const LocationContext = React.createContext<LocationContextType>({
  location: undefined,
  address: undefined,
  errorMsg: undefined,
});

export const UserContext = React.createContext<UserContextType>({
  displayName: undefined,
  userId: undefined,
  avatar: undefined,
});

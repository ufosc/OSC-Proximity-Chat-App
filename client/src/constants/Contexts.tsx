import React from "react";
import { AppContextType, LocationContextType, UserContextType } from "./types";

export const AppContext = React.createContext<AppContextType>({
  user: undefined,
  location: undefined,
});

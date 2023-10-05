import React from "react";
import { LocationContextType } from "./types";

export const LocationContext = React.createContext<LocationContextType>({
  location: undefined,
  address: undefined,
  errorMsg: undefined,
});

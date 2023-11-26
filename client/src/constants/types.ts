import { LocationGeocodedAddress, LocationObject } from "expo-location";

export type MessageType = {
  author: string;
  timestamp: Date;
  messageContent: string;
  msgId: string;
};

export type MessageDataType = {
  userId: string | undefined;
  msgId: string;
  msgContent: string;
  specificLat: number | undefined;
  specificLon: number | undefined;
  timeSent: number;
};

export type AppContextType = {
  user: UserContextType | undefined;
  location: LocationContextType | undefined;
};

export type UserContextType = {
  displayName: string | undefined;
  userId: string | undefined;
  avatar: string | undefined;
};

export type LocationContextType = {
  location: LocationObject | undefined;
  address: LocationGeocodedAddress[] | undefined;
  errorMsg: string | undefined;
};

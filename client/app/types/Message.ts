import { LocationType } from "./Location";

export interface Message {
  author: string,
  timestamp: number,
  content: {
    text?: string,
    attachment?: string,
  },
  location: LocationType,
  replyTo?: string,
  reactions: {
    [key: string]: number,
  }
}

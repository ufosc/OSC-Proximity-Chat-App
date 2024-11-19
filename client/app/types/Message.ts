import { LocationType } from "./Location";

export interface Message {
  author: string,
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

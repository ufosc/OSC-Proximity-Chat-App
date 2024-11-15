export interface Message {
  author: {
    uid: string;
    displayName: string;
    profilePicIndex: number;
    profileColor: string;
  };
  msgId: string;
  msgContent: string;
  timestamp: number;
  lastUpdated: number;
  location: {
    lat: number;
    lon: number;
  };
  isReply: boolean;
  replyTo: string;
  reactions: {
    [key: string]: number;
  };
}

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
  specificLat: string | undefined;
  specificLon: string | undefined;
  timeSent: number;
};


export type UserContextType = {
  displayName: string | undefined;
  userId: string | undefined;
  avatar: string | undefined;
};
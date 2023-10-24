export type MessageType = {
  author: string;
  timestamp: string; // Stored in UNIX time
  messageContent: string;
  messageId: string;
};

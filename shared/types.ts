export type MessageType = {
  authorId: string;
  timestamp: string; // Stored in UNIX time
  messageContent: string;
  messageId: string;
  broadLat: string;
  broadLon: string;
  specificLat: string;
  specificLon: string;
};

import React from "react";
import { View, StyleSheet } from "react-native";
import { MessageList } from "./MessageList";
import { MessageBox } from "./MessageBox";
import { useState } from "react";
import { MessageType } from "../constants/types";
import { useSocket } from "../constants/SocketContext";

export const MessageWrapper = () => {

  const socket = useSocket();

  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleSendMessage = (message: MessageType) => {
    setMessages([message, ...messages]);
    console.log(message);
  };

  return (
    <View style={styles.container}>
      <MessageList messages={messages} />
      <MessageBox onSendMessage={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
});

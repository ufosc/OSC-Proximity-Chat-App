import React from "react";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MessageType } from "../constants/types";
import { Message } from "./Message";
import { generateUniqueId } from "../constants/scripts";

export const MessageList = () => {
  const [messages, setMessages] = useState<Array<MessageType>>([
    {
      messageContent: "Hello World",
      timestamp: new Date(0),
      author: "John Doe",
      messageId: generateUniqueId().toString(),
    },
    {
      messageContent: "Hello World 2",
      timestamp: new Date(60 * 60 * 1000),
      author: "Jane Doe",
      messageId: generateUniqueId().toString(),
    },
    {
      messageContent:
        "Hello World from a very very long message. This message is so long that it will wrap to the next line. This is a very long message.",
      timestamp: new Date(2 * 60 * 60 * 1000),
      author: "Jack Doe",
      messageId: generateUniqueId().toString(),
    },
  ]);

  return (
    <View style={styles.container}>
      {messages.map((message) => {
        return (
          <Message
            key={message.messageId}
            messageContent={message.messageContent}
            timestamp={message.timestamp}
            author={message.author}
            messageId={message.messageId}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 2,
    justifyContent: "flex-end",
    padding: 5,
    marginBottom: 15
  },
});

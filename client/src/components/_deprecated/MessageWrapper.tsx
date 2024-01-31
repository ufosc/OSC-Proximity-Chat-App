import React from "react";
import { View, StyleSheet } from "react-native";
import { MessageList } from "./MessageList";
import { MessageBox } from "./MessageBox";
import { useState } from "react";
import { MessageType } from "../../utils/types";
import { useSocket } from "../../contexts/SocketContext";

export const MessageWrapper = () => {
  const socket = useSocket();

  const messages = [
    { author: "Alex", messageContent: "Hello, my name is Alex!!!", msgID: "1" },
    { author: "Ben", messageContent: "Hello, my name is Ben!!!", msgID: "2" },
    {
      author: "Chris",
      messageContent:
        "This is chris's message, it is a little bit longer because he a very outspoken person and has a lottt to say!",
      msgID: "3",
    },
    { author: "Alex", messageContent: "Hello, my name is Alex!!!", msgID: "4" },
    { author: "Ben", messageContent: "Hello, my name is Ben!!!", msgID: "5" },
    {
      author: "Chris",
      messageContent:
        "This is chris's message, it is a little bit longer because he a very outspoken person and has a lottt to say!",
      msgID: "6",
    },
    { author: "Alex", messageContent: "Hello, my name is Alex!!!", msgID: "7" },
    { author: "Ben", messageContent: "Hello, my name is Ben!!!", msgID: "8" },
  ];

  return (
    <View style={styles.container}>
      <MessageList messages={messages} />
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

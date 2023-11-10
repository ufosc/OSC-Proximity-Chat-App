import React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { MessageType } from "../constants/types";
import { Message } from "./Message";
import { generateUniqueId } from "../constants/scripts";

interface MessageListProps {
  messages: MessageType[]
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {

  return (
    // <View style={styles.container}>
    //   {messages.map((message) => {
    //     return (
    //       <Message
    //         key={message.messageId}
    //         messageContent={message.messageContent}
    //         timestamp={message.timestamp}
    //         author={message.author}
    //         messageId={message.messageId}
    //       />
    //     );
    //   })}
    // </View>

    <View style={styles.container}>
      {
        messages.map((item) => {
          return (
            <Message
            key={item.messageId}
            messageContent={item.messageContent}
            timestamp={item.timestamp}
            author={item.author}
            messageId={item.messageId}
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

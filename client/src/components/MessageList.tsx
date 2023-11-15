import React from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import { MessageType } from "../constants/types";
import { Message } from "./Message";

const { width } = Dimensions.get("window");

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1,
        width: width,
      }}
      data={messages}
      keyExtractor={(item) => item.msgId.toString()}
      renderItem={({ item }) => (
        <Message
          messageContent={item.messageContent}
          timestamp={item.timestamp}
          author={item.author}
          msgId={item.msgId}
        />
      )}
      inverted={true} // This will render items from the bottom
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

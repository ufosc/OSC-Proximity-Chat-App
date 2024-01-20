import React from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import { MessageType } from "../../utils/types";
import { Message } from "./Message";

const { width } = Dimensions.get("window");

interface MessageListProps {
  messages: {author: string, messageContent: string, msgId: string}[]
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {

  const date = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        width: width,
      }}
      data={messages}
      keyExtractor={(item) => item.msgId.toString()}
      renderItem={({ item }) => (
        <Message
          messageContent={item.messageContent}
          timestamp={date}
          author={item.author}
          msgId={item.msgId}
        />
      )}
      inverted={true} // This will render items from the bottom
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});

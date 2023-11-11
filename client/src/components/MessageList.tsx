import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { MessageType } from "../constants/types";
import { Message } from "./Message";

const { width } = Dimensions.get("window");

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    // <View style={styles.container}>
    //   {messages.map((item: MessageType) => {
    //     return (
    //       <Message
    //         key={item.messageId}
    //         messageContent={item.messageContent}
    //         timestamp={item.timestamp}
    //         author={item.author}
    //         messageId={item.messageId}
    //       />
    //     );
    //   })}
    // </View>

    <FlatList
      contentContainerStyle={{
        flexGrow: 1,
        width: width,
      }}
      data={messages}
      keyExtractor={(item) => item.messageId.toString()}
      renderItem={({ item }) => (
        <Message
          messageContent={item.messageContent}
          timestamp={item.timestamp}
          author={item.author}
          messageId={item.messageId}
        />
      )}
      inverted={true} // This will render items from the bottom
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

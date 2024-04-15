import React from "react";
import { FlatList } from "react-native";

import Message from "./ChatMessage";
import { MessageChannelProps } from "../../types/Props";

const MessageChannel: React.FC<MessageChannelProps> = ({ messages }) => {
  const reverseMessages = [...messages].reverse();

  return (
    <FlatList
      contentContainerStyle={{
        width: "100%",
      }}
      data={reverseMessages}
      keyExtractor={(item) => item.msgId}
      renderItem={({ item }) => (
        <Message
          messageContent={item.msgContent}
          author={item.author.displayName} // TODO: call server to get author name from UID. Or should this stored with MessageType?
          time={item.timestamp}
        />
      )}
      inverted // This will render items from the bottom
      onLayout={() => {}} // This will make sure the list is scrolled to the bottom on first render
    />
  );
};

export default MessageChannel;

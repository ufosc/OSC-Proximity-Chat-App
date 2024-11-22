import React from "react";
import { FlatList } from "react-native";

import Message from "./ChatMessage";
import { MessageChannelProps } from "../../types/Props";

const MessageChannel: React.FC<MessageChannelProps> = ({ nearbyUsers, messages }) => {
  const reverseMessages = [...messages].reverse();

  return (
    <FlatList
      contentContainerStyle={{
        width: "100%",
      }}
      data={reverseMessages}
      renderItem={({ item }) => {
        const user = nearbyUsers[item.author];
        console.log(nearbyUsers);
        if (user === undefined) return null;
        return (
          <Message
            messageContent={item.content.text!}
            author={user.displayName}
            time={item.timestamp}
          />
        );
      }}
      inverted // This will render items from the bottom
      onLayout={() => { }} // This will make sure the list is scrolled to the bottom on first render
    />
  );
};

export default MessageChannel;

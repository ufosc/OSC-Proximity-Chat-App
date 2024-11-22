import React from "react";
import { FlatList } from "react-native";

import Message from "./ChatMessage";
import { MessageChannelProps } from "../../types/Props";
import { NearbyUsersProvider, useNearbyUsers } from "@app/contexts/NearbyUserContext";

const MessageChannel: React.FC<MessageChannelProps> = ({ messages }) => {
  const reverseMessages = [...messages].reverse();
  const nearbyUsers = useNearbyUsers();

  return (
    <FlatList
      contentContainerStyle={{
        width: "100%",
      }}
      data={reverseMessages}
      renderItem={({ item }) => (
        <Message
          messageContent={item.content.text!}
          author={nearbyUsers[item.author].displayName}
          time={item.timestamp}
        />
      )}
      inverted // This will render items from the bottom
      onLayout={() => { }} // This will make sure the list is scrolled to the bottom on first render
    />
  );
};

export default MessageChannel;

import React, { useState } from "react";
import { FlatList } from "react-native";

import Message from "./ChatMessage";
import { MessageChannelProps } from "../../types/Props";
import { TouchableOpacity } from "react-native";
import SheetModal from "./SheetModal";

const MessageChannel: React.FC<MessageChannelProps> = ({
  nearbyUsers,
  messages,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const reverseMessages = [...messages].reverse();


  const handleLongPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <FlatList
      contentContainerStyle={{
        width: "100%",
      }}
      data={reverseMessages}
      renderItem={({ item }) => {
        const user = nearbyUsers[item.author];
        // console.log(nearbyUsers);
        if (user === undefined) return null;
        return (
          <TouchableOpacity onLongPress={ handleLongPress }>
          <Message
            messageContent={item.content.text!}
            author={user.displayName}
            time={item.timestamp}
          />
          </TouchableOpacity>
        );
      }}
      inverted // This will render items from the bottom
      onLayout={() => {}} // This will make sure the list is scrolled to the bottom on first render
    />
{isModalVisible && <SheetModal isVisible={isModalVisible} onDismiss={handleCloseModal} />}
</>
  );
};

export default MessageChannel;

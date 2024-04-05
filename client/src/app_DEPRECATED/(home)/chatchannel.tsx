import React from "react";
import { Stack } from "expo-router";
import ChatScreen from "../../screens/chat/ChatScreen";
import SafeAreaWrapper from "../../components/common/SafeAreaWrapper";

const ChatroomPage = () => {
  return (
    <SafeAreaWrapper>
      <ChatScreen />
    </SafeAreaWrapper>
  );
};

export default ChatroomPage;

import React from 'react'
import { Stack } from 'expo-router';
import ChatScreen from '../../components/Chat/ChatScreen'
import SafeAreaWrapper from '../../components/Common/SafeAreaWrapper';


const ChatroomPage = () => {
    return (
      <SafeAreaWrapper>
        <ChatScreen />
      </SafeAreaWrapper>
      );
}

export default ChatroomPage
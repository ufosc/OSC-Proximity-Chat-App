import React from 'react'
import Message from './ChatMessage'
import { FlatList, StyleSheet, View } from 'react-native'
import { MessageType } from '../../utils/types';

interface MessageChannelProps {
  messages: MessageType[],
}

const MessageChannel: React.FC<MessageChannelProps> = ({ messages }) => {
  const reverseMessages = [...messages].reverse()

  return (
      <FlatList
        contentContainerStyle={{
          width: '100%',
        }}
        data={reverseMessages}
        keyExtractor={(item) => item.msgID.toString()}
        renderItem={({ item }) => (
          <Message
            messageContent={item.messageContent}
            author={item.author}
          />
        )}
        inverted={true} // This will render items from the bottom
        onLayout={() => { }} // This will make sure the list is scrolled to the bottom on first render
      />
  )
}

export default MessageChannel
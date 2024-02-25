import React from 'react'
import Message from './ChatMessage'
import { FlatList, StyleSheet, View } from 'react-native'
import { MessageType } from '../../types/Message'

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
        keyExtractor={(item) => item.msgId.toString()}
        renderItem={({ item }) => (
          <Message
            messageContent={item.msgContent}
            author={item.author.uid} 
            time={item.timeSent}
          />
        )}
        inverted={true} // This will render items from the bottom
        onLayout={() => { }} // This will make sure the list is scrolled to the bottom on first render
      />
  )
}

export default MessageChannel

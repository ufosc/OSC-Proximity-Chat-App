import React from "react";

export type MessageType = {
  messageContent: string;
  author: string;
  msgID: string;
};

export type MessageProps =  {
  messageContent: string;
  // timestamp: Date, (This will be added later inside the message object passed in)
  author: string;
}

export type ChatSendButtonProps = {
  onPress?: () => void,
}

export type ChatInputProps = {
  value?: string,
  onChangeText?: (text: string) => void
}

export type LogInButtonProps = {
  onPress?: () => void;
}

export type MessageChannelProps = {
  messages: MessageType[],
}

export type CounterProps = {
  count: number;
}

export type SafeAreaWrapperProps = {
  children: React.ReactNode;
}

export type SignUpButtonProps = {
  onPress?: () => void;
}
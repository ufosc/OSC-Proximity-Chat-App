import React from "react";
import { MessageType } from "./Message";

export type MessageProps =  {
  messageContent: string;
  time: number;
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

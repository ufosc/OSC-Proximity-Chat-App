import React from "react";
import { Message } from "./Message";

/* button props */
export type LogInButtonProps = {
  onPress?: () => void;
}

export type SignUpButtonProps = {
    onPress?: () => void;
}

export type ChatSendButtonProps = {
    onPress?: () => void,
}
  
/* input props */
export type ChatInputProps = {
    value?: string,
    onChangeText?: (text: string) => void
}

/* message related props */
export type MessageProps =  {
    messageContent: string;
    time: number;
    author: string;
}

export type MessageChannelProps = {
  messages: Message[],
}

/* misc props*/
export type CounterProps = {
  count: number;
}

export type SafeAreaWrapperProps = {
  children: React.ReactNode;
}



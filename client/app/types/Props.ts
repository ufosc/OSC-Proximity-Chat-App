import React from "react";

import { Message } from "./Message";
import { UserProfile } from "./User";

/* button props */
export type LargeTextButtonProps = {
  onPress?: () => void;
  buttonText: string;
}

export type ChatSendButtonProps = {
  onPress?: () => void;
};

/* input props */
export type ChatInputProps = {
  value?: string;
  onChangeText?: (text: string) => void;
};

/* message related props */
export type MessageProps = {
  messageContent: string;
  time: number;
  author: string;
};

export type MessageChannelProps = {
  nearbyUsers: { [uid: string]: UserProfile };
  messages: Message[];
};

export type SafeAreaWrapperProps = {
  children: React.ReactNode;
};

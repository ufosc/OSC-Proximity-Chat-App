import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";

import { ChatSendButton } from "./CustomButtons";
import { ChatInputProps } from "../../types/Props";

export const WelcomeEmailInput: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      style={styles.welcomeEmailInput}
      placeholder="Email"
      multiline={false}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

// Maybe will put LogInEmailInput & LogInPasswordInput two together into a single component

export const EmailInput: React.FC<ChatInputProps & { invalid: boolean }> = ({
  value,
  onChangeText,
  invalid,
}) => {
  return (
    <TextInput
      style={[styles.loginInput, invalid && styles.invalidLoginInput]}
      placeholder="Email"
      multiline={false}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export const PasswordInput: React.FC<ChatInputProps & { invalid: boolean }> = ({
  value,
  onChangeText,
  invalid,
}) => {
  return (
    <TextInput
      style={[styles.loginInput, invalid && styles.invalidLoginInput]}
      placeholder="Password"
      multiline={false}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
    />
  );
};

// sign up screen inputs
export const ConfirmPasswordInput: React.FC<
  ChatInputProps & { invalid: boolean }
> = ({ value, onChangeText, invalid }) => {
  return (
    <TextInput
      style={[styles.loginInput, invalid && styles.invalidLoginInput]}
      placeholder="Confirm Password"
      multiline={false}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry
    />
  );
};

export const ChatInput: React.FC<ChatInputProps & { onSend: () => void }> = ({
  value,
  onChangeText,
  onSend,
}) => {
  return (
    <View style={styles.messsageContainer}>
      <TextInput
        placeholder="Say Something..."
        multiline
        value={value}
        onChangeText={onChangeText}
        maxLength={500}
        style={styles.messageInput}
      />

      <ChatSendButton onPress={onSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeEmailInput: {
    height: "100%",
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
  },

  loginInput: {
    width: "100%",
    minHeight: Dimensions.get("window").height * 0.055,
    borderWidth: 1.5,
    borderColor: "#D6D6D6",
    borderRadius: Dimensions.get("window").height * 0.015,
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    paddingBottom: Platform.OS === "ios" ? 15 : 0,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#F7F7F7",
    fontFamily: "Quicksand-Medium",
    elevation: 2,
  },
  messsageContainer: {
    width: Dimensions.get("window").width * 0.75,
    borderWidth: 1,
    borderRadius: 30,
    paddingTop: Dimensions.get("window").height * 0.006,
    paddingBottom: Dimensions.get("window").height * 0.006,
    paddingLeft: 15,
    paddingRight: Dimensions.get("window").height * 0.006,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#8E8E8E",
  },
  messageInput: {
    width: Dimensions.get("window").height * 0.35,
    fontSize: 16,
  },
  invalidLoginInput: {
    borderColor: "red",
  },
});

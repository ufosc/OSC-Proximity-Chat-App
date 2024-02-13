import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { ChatInput } from "../Common/CustomInputs";
import { ChatSendButton } from "../Common/CustomButtons";
import MessageChannel from "../Common/MessageChannel";
import { MessageType } from "../../utils/types";
import * as Crypto from "expo-crypto";
import { generateName } from "../../utils/scripts";
import { useSettings } from "../../contexts/SettingsContext";
import { SignOutButton } from "../Common/AuthButtons"
import { useUser } from "../../contexts/UserContext"

const ChatScreen = () => {
  const settings = useSettings();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  // Message loading and sending logic
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [message, setMessage] = React.useState<string>("");

  const user = useUser();

  // For when the user sends a message (fired by the send button)
  const onHandleSubmit = () => {
    if (message.trim() !== "") {
      const newMessage: MessageType = {
        msgID: Crypto.randomUUID(),
        messageContent: message.trim(),
        author: user.displayName,
      };

      setMessages([...messages, newMessage]);

      setMessage("");
    }
  };

  return (
    <View
      style={{
        backgroundColor:
          settings && settings.theme != "light" ? "#191d20" : "white", // Needs to be changed to be a prop later (new issue?)
      }}
    >
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? screenHeight * 0.055 : 0
        }
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Chat Screen
            </Text>
          </View>
          <SignOutButton />
          <View style={styles.chatContainer}>
            <MessageChannel messages={messages} />
          </View>
          <View style={styles.footerContainer}>
            <ChatInput
              value={message}
              onChangeText={(text: string) => {
                setMessage(text);
              }}
            />
            <ChatSendButton onPress={onHandleSubmit} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  headerContainer: {
    width: "100%",
    height: Dimensions.get("window").height * 0.05,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  chatContainer: {
    width: "100%",
    flex: 1,
  },

  footerContainer: {
    width: "95%",
    minHeight: Dimensions.get("window").height * 0.1,
    maxHeight: Dimensions.get("window").height * 0.15,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingBottom: Dimensions.get("window").height * 0.02,
    paddingTop: Dimensions.get("window").height * 0.02,
    marginTop: 10,
    borderTopWidth: 1,
  },
});

export default ChatScreen;

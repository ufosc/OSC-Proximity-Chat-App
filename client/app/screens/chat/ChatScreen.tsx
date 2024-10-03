import * as Crypto from "expo-crypto";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

import { SignOutButton } from "../../components/auth/AuthButtons";
import { ChatScreenFooter } from "../../components/chat/ChatScreenFooter";
import MessageChannel from "../../components/chat/MessageChannel";
import { useLocation } from "../../contexts/LocationContext";
import { useSettings } from "../../contexts/SettingsContext";
import { useSocket } from "../../contexts/SocketContext";
import { AuthStore } from "../../services/AuthStore";
import { Message } from "../../types/Message";
import { useState, useEffect } from "react";

const ChatScreen = () => {
  const settings = useSettings();
  const screenHeight = Dimensions.get("window").height;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const socket = useSocket();
  const location = useLocation();
  const userAuth = AuthStore.useState();
  // Note: To prevent complexity, all user information is grabbed from different contexts and services. If we wanted most information inside of UserContext, we would have to import contexts within contexts and have state change as certain things mount, which could cause errors that are difficult to pinpoint.

  // Message loading and sending logic
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState<string>("");


  useEffect(() => {
    if (socket === null) return; // This line might need to be changed

    const handleMessage = (data: any, ack?: any) => {
      console.log("Message received from server:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      if (ack) console.log("Server acknowledged message:", ack);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [messages, socket]);

  // For when the user sends a message (fired by the send button)
  const onHandleSubmit = () => {
    if (messageContent.trim() !== "") {
      const newMessage: Message = {
        author: {
          uid: String(userAuth.userAuthInfo?.uid),
          displayName: "Anonymous",
        },
        msgId: Crypto.randomUUID(),
        msgContent: messageContent.trim(),
        timestamp: Date.now(),
        lastUpdated: Date.now(),
        location: {
          lat: Number(location?.latitude),
          lon: Number(location?.longitude),
        },
        isReply: false,
        replyTo: "",
        reactions: {},
      };

      if (socket !== null) {
        socket.emit("message", newMessage);
      }

      setMessageContent("");
    }
  };

  return (
    <View
      style={{
        backgroundColor:
          settings && settings.theme !== "light" ? "#191d20" : "white", // Needs to be changed to be a prop later (new issue?)
      }}>
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        keyboardVerticalOffset={
          Platform.OS === "ios" ? screenHeight * 0.055 : 0
        }>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "white",
              }}>
              Chat Screen
            </Text>
          </View>
          
          <View style={styles.chatContainer}>
            <MessageChannel messages={messages} />
          </View>
          <View style={styles.footerContainer}>
            <ChatScreenFooter
              value={messageContent}
              onChangeText={(text: string) => {
                setMessageContent(text);
              }}
              onSend={onHandleSubmit}
            />
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

    maxHeight: Dimensions.get("window").height * 0.15,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    paddingBottom: Dimensions.get("window").height * 0.003,
    paddingTop: Dimensions.get("window").height * 0.004,
    marginTop: 0,
    borderTopWidth: 0,
    borderColor: "#8E8E8E",
  },
});

export default ChatScreen;

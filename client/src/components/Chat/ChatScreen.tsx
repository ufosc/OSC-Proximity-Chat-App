import React, { useEffect } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import * as Crypto from "expo-crypto";
import { generateName } from "../../utils/scripts";
import { useSettings } from "../../contexts/SettingsContext";
import { SignOutButton } from "../Common/AuthButtons"
import { MessageType } from "../../types/Message";
import { LocationProvider } from "../../contexts/LocationContext";
import { useSocket } from "../../contexts/SocketContext";
import { useLocation } from "../../contexts/LocationContext";
import { AuthStore } from "../../services/store";
import { ChatMessageFooter } from "../Common/ChatMessageFooter"

const ChatScreen = () => {
  const settings = useSettings();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const socket = useSocket();
  const location = useLocation();
  const { user } = AuthStore.useState();

  // Message loading and sending logic
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [messageContent, setMessageContent] = React.useState<string>("");

  useEffect(() => {
    if (socket === null) return // This line might need to be changed.
    socket.on("message", (data: MessageType, ack) => {
      console.log("Message recieved from server:", data);
      if (ack) console.log("Server acknowledged message:", ack);
      setMessages([...messages, data])
    })
    return () => {
      socket.off()
    }
  }, [messages])

  // For when the user sends a message (fired by the send button)
  const onHandleSubmit = () => {
    if (messageContent.trim() !== "") {
      const newMessage: MessageType = {
        uid: String(user?.uid), 
        msgId: Crypto.randomUUID(), 
        msgContent: messageContent.trim(),
        timeSent: Date.now(),
        location: {
          lat: Number(location?.latitude),
          lon: Number(location?.longitude)
        }
      }

      if (socket !== null) {
        socket.emit("message", newMessage)
      }
      
      setMessages([...messages, newMessage]);
      setMessageContent("");
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
            <ChatMessageFooter
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

import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LocationContext } from "../constants/LocationContext";
import { UserContext } from "../constants/UserContext";
import { LocationContextType, UserContextType } from "../constants/types";
import { MessageType } from "../constants/types";
import { generateUniqueId } from "../constants/scripts";

const sendIcon = require("../../assets/paper-plane.png");

interface MessageBoxProps {
  onSendMessage: (message: MessageType) => void;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ onSendMessage }) => {
  const [messageContent, setMessageContent] = useState<string>("");
  const keyboardVerticalOffest = Platform.OS === "ios" ? 50 : 0;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;
  const inputBoxStyles =
    Platform.OS === "ios"
      ? styles.ios_specific_text
      : styles.android_specific_text;

  return (
    <LocationContext.Consumer>
      {(locationContext: LocationContextType) => {
        return (
          <UserContext.Consumer>
            {(UserContext: UserContextType) => {
              const onPress = () => {
                if (messageContent === "") {
                  console.log("Empty string entered...");
                } else {
                  const newMessage: MessageType = {
                    author: UserContext.displayName!,
                    timestamp: new Date(2 * 60 * 60 * 1000),
                    messageContent: messageContent,
                    messageId: String(generateUniqueId()),
                  };

                  console.log(newMessage);

                  onSendMessage(newMessage);
                  setMessageContent("");
                }
              };

              return (
                <KeyboardAvoidingView
                  behavior={keyboardBehavior}
                  keyboardVerticalOffset={keyboardVerticalOffest}
                >
                  <View style={styles.container}>
                    <TextInput
                      style={inputBoxStyles}
                      onChangeText={setMessageContent}
                      value={messageContent}
                      placeholder="Say Something..."
                      placeholderTextColor={"gray"}
                      multiline={true}
                      maxLength={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                      <Image source={sendIcon} style={styles.sendIcon} />
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              );
            }}
          </UserContext.Consumer>
        );
      }}
    </LocationContext.Consumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    display: "flex",
    overflow: "hidden", // Ensures inner elements don't overflow rounded corners
    maxWidth: "90%",
    minWidth: "90%",
    justifyContent: "space-between",
    minHeight: 45,
    alignItems: "flex-end",
    paddingLeft: 5,
    marginBottom: 15,
    paddingTop: 15,
  },
  button: {
    backgroundColor: "#3333ff",
    flexDirection: "column",
    borderRadius: 25,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  sendIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 3,
  },
  android_specific_text: {
    backgroundColor: "#F3F2F2",
    padding: 8,
    paddingLeft: 18,
    paddingRight: 18,
    width: "84%",
    borderRadius: 25,
    maxHeight: 200,
    minHeight: 45,
  },

  ios_specific_text: {
    backgroundColor: "#F3F2F2",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    width: "84%",
    borderRadius: 25,
    maxHeight: 200,
    minHeight: 45,
  },
});

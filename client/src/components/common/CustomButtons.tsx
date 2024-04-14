import React from "react";
import { StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";

import { ChatSendButtonProps } from "../../types/Props";

export const ChatSendButton: React.FC<ChatSendButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.sendButton} onPress={onPress}>
      <Image
        style={styles.sendButtonImage}
        source={require("../../../assets/icons/arrow/transparentSend.png")}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    height: Dimensions.get("window").width * 0.09,
    width: Dimensions.get("window").width * 0.09,
    borderRadius: 100,
    backgroundColor: "#34D1BF",
    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonImage: {
    height: "64%",
    width: "64%",
    marginLeft: "13%",
    tintColor: "white",
  },
});

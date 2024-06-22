import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Smile, Image } from "react-native-feather";

import { ChatSendButton } from "../common/CustomButtons";

interface ChatInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  invalid?: boolean;
  onSend?: () => void;
}

export const ChatScreenFooter: React.FC<ChatInputProps> = ({
  value,
  onChangeText,
  onSend,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image color="black" strokeWidth={1.8} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Smile color="black" strokeWidth={1.8} style={styles.icons} />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Say Something..."
        multiline
        value={value}
        onChangeText={onChangeText}
        maxLength={500}
        style={styles.messageInput}
      />
      <View style={styles.sendButtonContainer}>
        <ChatSendButton onPress={onSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    borderColor: "#8E8E8E",
    borderWidth: 1,
    borderRadius: Dimensions.get("window").width * 0.058,
    marginHorizontal: Dimensions.get("window").width * 0.005,
    marginBottom: Platform.OS === "ios" ? 0 : 5,
    minHeight: Dimensions.get("window").width * 0.113,
    maxHeight: Dimensions.get("window").width * 0.3,
  },
  messageInput: {
    fontSize: 16,
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 5 : 4,
    marginTop: Platform.OS === "ios" ? 2 : 4,
    marginHorizontal: Dimensions.get("window").width * 0.018,
  },
  icons: {
    marginHorizontal: Dimensions.get("window").width * 0.008,
  },
  iconContainer: {
    marginLeft: Dimensions.get("window").width * 0.02,
    marginBottom: Dimensions.get("window").width * 0.025,
    marginTop: Dimensions.get("window").width * 0.025,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  sendButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignSelf: "stretch",
    marginRight: Dimensions.get("window").width * 0.01,
    marginBottom: Dimensions.get("window").width * 0.01,
    marginTop: Dimensions.get("window").width * 0.01,
  },
});

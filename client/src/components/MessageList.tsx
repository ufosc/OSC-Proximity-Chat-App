import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export const MessageList = () => {
  const [messages, setMessages] = useState<Array<any>>();

  return (
    <View>
      {messages?.map((message) => (
        <View />
        // This should display each message and its metadata
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

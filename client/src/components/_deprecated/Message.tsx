import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { MessageType } from "../../utils/types";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

interface MessageProps {
  messageContent: string;
  timestamp: Date;
  author: string;
  msgId: string;
}

export const Message = (messageContent:string, timestamp:Date, author:string, msgID:string) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.image_row}>
          <Image
            style={styles.image}
            source={{
              uri: "https://gravatar.com/avatar/6708fe974ea02f5b77e940bd77d33552?s=400&d=robohash&r=x",
            }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.content_column}>
          <View style={styles.header_row}>
            <Text style={styles.author}>{author} </Text>

            <Text style={styles.timestamp}>
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>

          <View style={styles.message_container}>
            <Text style={styles.messageContent}>{messageContent}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: windowWidth,
    paddingVertical: 5,
    paddingTop: 7,
    paddingBottom: 7,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 4,
    paddingLeft: 4,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 150,
    backgroundColor: "black",
    justifyContent: "center",
  },
  author: {
    fontWeight: "bold",
    fontSize: 15,
  },
  timestamp: {
    fontWeight: "500",
  },

  messageContent: {
    flexWrap: "wrap",
  },

  message_container: {},

  image_row: {
    width: "15%",
    alignItems: "center",
    minWidth: 55,
  },

  content_column: {
    width: "85%",
    paddingLeft: 6,
  },

  header_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    marginBottom: 5,
  },
});

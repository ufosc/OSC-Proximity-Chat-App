
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { MessageType } from "../constants/types";

export const Message = (props: MessageType) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.image}
            source={{
              uri: "https://gravatar.com/avatar/6708fe974ea02f5b77e940bd77d33552?s=400&d=robohash&r=x",
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.author}>{props.author} </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 5 }}>
          <Text style={styles.timestamp}>
            {props.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
      <Text style={styles.messageContent}>{props.messageContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "100%",
    paddingVertical: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 150,
    backgroundColor: "black",
    justifyContent: "center",
  },
  author: {
    fontWeight: "bold",
    marginLeft: -10,
  },
  timestamp: {
    color: "darkgray",
    fontWeight: "bold",
  },
  messageContent: {
    marginLeft: 80,
    marginTop: -20,
  },

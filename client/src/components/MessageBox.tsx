import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { LocationContext } from "../constants/LocationContext";
import { UserContext } from "../constants/UserContext";
import { UserContextType } from "../constants/types";

export const MessageBox = () => {
  const [messageContent, setMessageContent] = useState<string>("");

  return (
    <LocationContext.Consumer>
      {(locationContext) => {
        return (
          <UserContext.Consumer>
            {(UserContext) => {
              const onPress = () => {
                console.log({
                  message: messageContent,
                  latitude: locationContext.location?.coords.latitude,
                  longitude: locationContext.location?.coords.longitude,
                  timestamp: new Date().getTime(),
                  authorId: UserContext.userId,
                });
                setMessageContent("");
              };

              return (
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    onChangeText={setMessageContent}
                    value={messageContent}
                    placeholder="Send a Message"
                  />
                  <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={{ color: "#ffffff" }}>{"Send"}</Text>
                  </TouchableOpacity>
                </View>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  button: {
    height: 40,
    width: 50,
    margin: 5,
    backgroundColor: "#3333ff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flexGrow: 1,
    height: 40,
    borderWidth: 1,
    padding: 5,
    margin: 5,
    marginRight: 0,
  },
});

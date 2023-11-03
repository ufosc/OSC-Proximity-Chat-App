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
                    placeholder="Say Something"
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
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#3333ff", // Background color to match the button
    borderRadius: 25, // Border radius for the outer corners of the oval
    overflow: 'hidden', // Ensures inner elements don't overflow rounded corners
    width: '90%'
  },
  button: {
    height: 40,
    width: 50,
    backgroundColor: "#3333ff",
    //backgroundColor: "#F3F2F2",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 0, // Removes border radius on the side adjoining the input
    borderBottomLeftRadius: 0, // Removes border radius on the side adjoining the input
  },
  input: {
    backgroundColor: "#F3F2F2",
    flexGrow: 1,
    height: 40,
    borderWidth: 0,
    padding: 5,
    borderTopRightRadius: 0, // Removes border radius on the side adjoining the button
    borderBottomRightRadius: 0, // Removes border radius on the side adjoining the button
  },
});


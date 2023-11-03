import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LocationContext } from "../constants/LocationContext";
import { UserContext } from "../constants/UserContext";
import { UserContextType } from "../constants/types";

export const MessageBox = () => {
  const [messageContent, setMessageContent] = useState<string>("");
  const keyboardVerticalOffest = Platform.OS === 'ios' ? 65 : 0;
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;

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
                <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={keyboardVerticalOffest}>
                  <View style={styles.container}>
                    <TextInput
                      style={styles.input}
                      onChangeText={setMessageContent}
                      value={messageContent}
                      placeholder="Say Something..."
                      placeholderTextColor={'gray'}
                    />
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                      <Text style={ styles.button_text }>{"Send"}</Text>
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
    justifyContent: 'center',
    borderRadius: 25, // Border radius for the outer corners of the oval
    overflow: 'hidden', // Ensures inner elements don't overflow rounded corners
    width: '90%',
    height: 45
  },
  button: {
    backgroundColor: '#3333ff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 8,
    borderTopLeftRadius: 0, // Removes border radius on the side adjoining the input
    borderBottomLeftRadius: 0, // Removes border radius on the side adjoining the input
  },

  button_text: {
    color: 'white',
    marginRight: 3
  },

  input: {
    backgroundColor: '#F3F2F2',
    flexGrow: 100,
    padding: 15,
    borderWidth: 0,
    borderTopRightRadius: 0, // Removes border radius on the side adjoining the button
    borderBottomRightRadius: 0, // Removes border radius on the side adjoining the button
  },
});


import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import { LocationContext } from "../constants/LocationContext";
import { UserContext } from "../constants/UserContext";
import { UserContextType } from "../constants/types";

const sendIcon = require('../../assets/paper-plane.png')

export const MessageBox = () => {
  const [messageContent, setMessageContent] = useState<string>("");
  const keyboardVerticalOffest = Platform.OS === 'ios' ? 65 : 0;
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const inputBoxStyles = Platform.OS === 'ios' ? styles.ios_specific_text : styles.android_specific_text;

  return (
    <LocationContext.Consumer>
      {(locationContext) => {
        return (
          <UserContext.Consumer>
            {(UserContext) => {
              const onPress = () => {
                if (messageContent === '') {
                  console.log('Empty string entered...')
                } else {
                  console.log({
                    message: messageContent,
                    latitude: locationContext.location?.coords.latitude,
                    longitude: locationContext.location?.coords.longitude,
                    timestamp: new Date().getTime(),
                    authorId: UserContext.userId,
                  });
                  setMessageContent("");
                }

              };

              return (
                <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={keyboardVerticalOffest}>
                  <View style={styles.container}>
                    <TextInput
                      style={inputBoxStyles}
                      onChangeText={setMessageContent}
                      value={messageContent}
                      placeholder="Say Something..."
                      placeholderTextColor={'gray'}
                      multiline={true}
                      maxLength={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                      <Image source={sendIcon} style={styles.sendIcon}/>
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
    overflow: 'hidden', // Ensures inner elements don't overflow rounded corners
    maxWidth: '90%',
    minWidth: '90%',
    marginBottom: 15,
    justifyContent: 'space-between',
    minHeight: 45,
    alignItems: 'flex-end',
    paddingLeft: 5
  },
  button: {
    backgroundColor: '#3333ff',
    flexDirection: 'column',
    width: '13%',
    borderRadius: 25,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },

  sendIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 3
  },
  android_specific_text: {
    backgroundColor: '#F3F2F2',
    padding: 8,
    paddingLeft: 18,
    paddingRight: 18,
    width: '84%',
    borderRadius: 25,
    maxHeight: 200
  },

  ios_specific_text: {
    backgroundColor: '#F3F2F2',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    width: '84%',
    borderRadius: 25,
    maxHeight: 200
  }
});


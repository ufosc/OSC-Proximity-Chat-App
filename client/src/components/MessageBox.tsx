import React, { useEffect, useState, useRef } from "react";
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
import * as Crypto from "expo-crypto";
import { LocationContext } from "../constants/LocationContext";
import { UserContext } from "../constants/UserContext";
import { MessageDataType } from "../constants/types";

const sendIcon = require('../../assets/paper-plane.png')

const postMessage = async (messageData: MessageDataType) => {
  const URL = `${process.env.EXPO_PUBLIC_API_URL}/messages`;
  const response = await fetch(URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    referrerPolicy: "same-origin",
    body: JSON.stringify(messageData)
  })
  return response.json();
}

export const MessageBox = () => {
  const [messageContent, setMessageContent] = useState<string>("");
  const isMounted = useRef(false);
  const [messageData, setMessageData] = useState<MessageDataType>({
    userId: "",
    msgId: "",
    msgContent: "",
    specificLat: 0.0,
    specificLon: 0.0,
    timeSent: new Date(0).getTime()
  });
  const keyboardVerticalOffest = Platform.OS === 'ios' ? 50 : 0;
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined;
  const inputBoxStyles = Platform.OS === 'ios' ? styles.ios_specific_text : styles.android_specific_text;

  useEffect(() => {
    if (isMounted.current) {
      postMessage(messageData).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.error(err)
      });
    } else {
      isMounted.current = true;
    }
  }, [messageData]);

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
                  const messageData: MessageDataType = {
                    userId: UserContext.userId,
                    msgId: Crypto.randomUUID(),
                    msgContent: messageContent,
                    specificLat: locationContext.location?.coords.latitude,
                    specificLon: locationContext.location?.coords.longitude,
                    timeSent: new Date().getTime(),
                  };
                  setMessageData(messageData);
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
    justifyContent: 'space-between',
    minHeight: 45,
    alignItems: 'flex-end',
    paddingLeft: 5,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#3333ff',
    flexDirection: 'column',
    borderRadius: 25,
    height: 45,
    width: 45,
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
    maxHeight: 200,
    minHeight: 45
  },

  ios_specific_text: {
    backgroundColor: '#F3F2F2',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 18,
    paddingRight: 18,
    width: '84%',
    borderRadius: 25,
    maxHeight: 200,
    minHeight: 45
  }
});


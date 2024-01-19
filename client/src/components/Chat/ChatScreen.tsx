import React from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native'

const ChatScreen = () => {

    const keyboardVerticalOffest = Platform.OS === "ios" ? 0 : 0;
    const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={keyboardVerticalOffest}>
                
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default ChatScreen;
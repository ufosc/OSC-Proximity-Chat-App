import React, { Fragment } from 'react'
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native'
import { ChatInput } from '../Common/CustomInputs';
import { ChatSendButton } from '../Common/CustomButtons';
import MessageChannel from '../Common/MessageChannel';
import { LinearGradient } from 'expo-linear-gradient';

const ChatScreen = () => {
    const keyboardBehavior = Platform.OS === "ios" ? "padding" : "height";

    const messages = [
        { author: 'Alex', messageContent: 'Hello, my name is Alex!!!', msgID: '1' },
        { author: 'Ben', messageContent: 'Hello, my name is Ben!!!', msgID: '2' },
        { author: 'Chris', messageContent: "This is chris's message, it is a little bit longer because he a very outspoken person and has a lottt to say!", msgID: '3' },
        { author: 'Alex', messageContent: 'Hello, my name is Alex!!!', msgID: '4' },
        { author: 'Ben', messageContent: 'Hello, my name is Ben!!!', msgID: '5' },
        { author: 'Chris', messageContent: "This is chris's message, it is a little bit longer because he a very outspoken person and has a lottt to say!", msgID: '6' },
        { author: 'Alex', messageContent: 'Hello, my name is Alex!!!', msgID: '7' },
        { author: 'Ben', messageContent: 'Hello, my name is Ben!!!', msgID: '8' },
    ]

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}>
                <View style={styles.mainContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: 'white',
                        }}>Chat Screen</Text>
                    </View>
                    <View style={styles.chatContainer}>
                        <MessageChannel messages={messages} />
                    </View>
                    <View style={styles.footerContainer}>
                        <ChatInput />
                        <ChatSendButton />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    headerContainer: {
        width: '100%',
        height: Dimensions.get('window').height * 0.05,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#98BF64',
    },

    chatContainer: {
        width: '100%',
        flex: 1,
    },

    footerContainer: {
        width: '95%',
        minHeight: Dimensions.get('window').height * 0.1,
        maxHeight: Dimensions.get('window').height * 0.15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        paddingBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.02,
        marginTop: 10,
        borderTopWidth: 1,
    },
});

export default ChatScreen;
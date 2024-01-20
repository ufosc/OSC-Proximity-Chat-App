import React, { Fragment } from 'react'
import { View, StyleSheet, Text, SafeAreaView, Platform } from 'react-native'
import ChatScreen from '../components/Chat/ChatScreen'


const ChatroomPage = () => {
    return (
        <>
          {Platform.OS === 'ios' ? (
            <Fragment>
              <SafeAreaView style={{flex: 0, backgroundColor: '#000'}} />
              <SafeAreaView style={{flex: 1}}>
                <ChatScreen />
              </SafeAreaView>
            </Fragment>
          ) : (
            // On non-iOS platforms, render the app directly without SafeAreaView
            <ChatScreen />
          )}
        </>
      );
}

export default ChatroomPage
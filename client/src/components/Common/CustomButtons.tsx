import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

export const ChatSendButton = () => {
  return (
    <TouchableOpacity style={styles.sendButton}>
        <Image style={styles.sendButtonImage} source={require('../../../assets/send.png')}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    sendButton: {
        height: Dimensions.get('window').height * 0.055,
        width: Dimensions.get('window').height * 0.055,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sendButtonImage:{
        height: Dimensions.get('window').height * 0.033,
        width: Dimensions.get('window').height * 0.033,
        marginLeft: Dimensions.get('window').width * 0.01,
    },
})
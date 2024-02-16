import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native'

interface ChatSendButtonProps {
  onPress?: () => void,
}

export const ChatSendButton: React.FC<ChatSendButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.sendButton} onPress={onPress}>
        <Image style={styles.sendButtonImage} source={require('../../../assets/transparentSend.png')}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    sendButton: {
        height: Dimensions.get('window').height * 0.044,
        width: Dimensions.get('window').height * 0.044,
        borderRadius: 30,
        backgroundColor: '#34D1BF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sendButtonImage:{
        height: Dimensions.get('window').height * 0.027,
        width: Dimensions.get('window').height * 0.027,
        marginLeft: Dimensions.get('window').width * 0.01,
        tintColor: 'white',
    },
})


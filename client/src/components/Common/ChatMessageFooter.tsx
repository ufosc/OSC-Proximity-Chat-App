import React from 'react'
import { TextInput, View, StyleSheet, Dimensions, Platform } from 'react-native'
import { ChatSendButton } from './CustomButtons'

interface ChatInputProps {
    value?: string,
    onChangeText?: (text: string) => void
    invalid?: boolean,
    onSend?: () => void,
}

export const ChatMessageFooter: React.FC<ChatInputProps> = ({ value, onChangeText, onSend }) => {


    
    return (
        <View style={styles.messsageContainer}>
            
            <TextInput 
            placeholder='Say Something...'
            multiline={true}
            value={value}
            onChangeText={onChangeText}
            maxLength={500}
            style={styles.messageInput}/>
            
            <ChatSendButton onPress={(onSend)} />
        </View>
    )
};

const styles = StyleSheet.create({

    messsageContainer: {
        width: Dimensions.get('window').width * 0.75,
        borderWidth: 1,
        borderRadius: 30,
        paddingTop: Dimensions.get('window').height * 0.006,
        paddingBottom: Dimensions.get('window').height * 0.006,
        paddingLeft: 15,
        paddingRight: Dimensions.get('window').height * 0.006,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: "#8E8E8E"
    },
    messageInput: {
        width: Dimensions.get('window').height * 0.35,
        fontSize: 16,
    },

});
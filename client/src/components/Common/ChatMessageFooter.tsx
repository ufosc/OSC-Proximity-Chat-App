import React from 'react'
import { TextInput, View, StyleSheet, Dimensions, Platform } from 'react-native'
import { ChatSendButton } from './CustomButtons'
import { Smile, Image } from "react-native-feather";

interface ChatInputProps {
    value?: string,
    onChangeText?: (text: string) => void
    invalid?: boolean,
    onSend?: () => void,
}

export const ChatMessageFooter: React.FC<ChatInputProps> = ({ value, onChangeText, onSend }) => {


    
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image color={"black"} strokeWidth={1.8} style={styles.icons}/>
                <Smile color={"black"} strokeWidth={1.8} style={styles.icons}/>
            </View>
            <View style={styles.chatboxContainer}>
                <TextInput 
                placeholder='Say Something...'
                multiline={true}
                value={value}
                onChangeText={onChangeText}
                maxLength={500}
                style={styles.messageInput}/>
            </View>
            <ChatSendButton onPress={(onSend)} />
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        width: Dimensions.get('window').width * 0.75,
        paddingTop: Dimensions.get('window').width * 0.013,
        paddingBottom: Dimensions.get('window').width * 0.013,
        paddingLeft: Dimensions.get('window').width * 0.02,
        paddingRight: Dimensions.get('window').width * 0.014,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: "#8E8E8E",
        borderWidth: 1,
        borderRadius: Dimensions.get('window').height * 0.027,
    },
    messageInput: {
        //width: Dimensions.get('window').width * 0.66,
        maxWidth: Dimensions.get('window').width * 0.66,
        fontSize: 16,
    },
    icons: {
        marginLeft: 5,
    },
    iconContainer: {
        marginRight: 5,
        flexDirection: 'row',
    },
    chatboxContainer: {
        flex: 1,
    }

});
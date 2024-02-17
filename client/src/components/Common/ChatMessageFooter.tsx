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
            <View style={styles.sendButtonContainer}>
                <View style={{flex:1}}/>
                <View style={styles.iconContainer}>
                    <Image color={"black"} strokeWidth={1.8} style={styles.icons}/>
                    <Smile color={"black"} strokeWidth={1.8} style={styles.icons}/>
                </View>
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
            <View style={styles.sendButtonContainer}>
                {/*Buffer view to push sendButton to the bottom*/}
                <View style={{flex:1}}/>
                <View style={{flex:0}}>
                    <ChatSendButton onPress={(onSend)} />
                </View>
            </View>
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
        borderRadius: Dimensions.get('window').width * 0.058,
    },
    messageInput: {
        maxWidth: Dimensions.get('window').width * 0.66,
        fontSize: 16,
    },
    icons: {
        marginLeft: Dimensions.get('window').width * 0.013,
    },
    iconContainer: {
        marginRight: Dimensions.get('window').width * 0.013,
        flexDirection: 'row',
        flex: 0,
        marginBottom: 5,
    },
    chatboxContainer: {
        flex: 1,
    },
    sendButtonContainer: {
        flex: 0,
        alignItems: "flex-end",
        flexDirection: "column",
    }

});
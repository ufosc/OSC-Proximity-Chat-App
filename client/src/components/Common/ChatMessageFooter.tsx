import React from 'react'
import { TextInput, View, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native'
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
                <TouchableOpacity>
                    <Image color={"black"} strokeWidth={1.8} style={styles.icons}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Smile color={"black"} strokeWidth={1.8} style={styles.icons}/>
                </TouchableOpacity>
            </View>
            <TextInput
            placeholder='Say Something...'
            multiline={true}
            value={value}
            onChangeText={onChangeText}
            maxLength={500}
            style={styles.messageInput}/>
            <View style={styles.sendButtonContainer}>
                <ChatSendButton onPress={(onSend)} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderColor: "#8E8E8E",
        borderWidth: 1,
        borderRadius: Dimensions.get('window').width * 0.058,
        marginHorizontal: Dimensions.get('window').width * 0.005,
        minHeight: Dimensions.get('window').height * 0.054,
    },
    messageInput: {
        fontSize: 16,
        flex: 1,
        
    },
    icons: {
        marginHorizontal: Dimensions.get('window').width * 0.008,
    },
    iconContainer: {
        marginLeft: Dimensions.get('window').width * 0.02,
        marginRight: Dimensions.get('window').width * 0.009,
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "flex-end",
        alignSelf: "stretch",
        

    },
    sendButtonContainer: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "row",
        alignSelf: "stretch",
    }

});
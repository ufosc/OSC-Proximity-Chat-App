import React from 'react'
import { TextInput, View, StyleSheet, Dimensions, Platform } from 'react-native'
import { useFonts } from 'expo-font'
import { ChatSendButton } from './CustomButtons'

interface ChatInputProps {
    value?: string,
    onChangeText?: (text: string) => void
    invalid?: boolean,
    onSend?: () => void,
}

export const WelcomeEmailInput: React.FC<ChatInputProps> = ({ value, onChangeText }) => {
    return (
        <TextInput style={styles.welcomeEmailInput}
        placeholder='Email'
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        />
    )
}

// Maybe will put LogInEmailInput & LogInPasswordInput two together into a single component

export const LogInEmailInput: React.FC<ChatInputProps> = ({ value, onChangeText, invalid }) => {
    return (
        <TextInput style={[styles.loginInput, invalid && styles.invalidLoginInput]}
        placeholder='Email'
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        />
    )
}

export const LogInPasswordInput: React.FC<ChatInputProps> = ({ value, onChangeText, invalid }) => {
    return (
        <TextInput style={[styles.loginInput, invalid && styles.invalidLoginInput]}
        placeholder='Password'
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={true}
        />
    )
}

// sign up screen inputs

export const SignUpEmailInput: React.FC<ChatInputProps> = ({ value, onChangeText }) => {
    return (
        <TextInput style={styles.loginInput}
        placeholder='Email'
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        />
    )
}

export const SignUpPasswordInput: React.FC<ChatInputProps> = ({ value, onChangeText}) => {
    return (
        <TextInput style={styles.loginInput}
        placeholder='Password'
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={true}
        />
    )
}

export const SignUpConfirmPasswordInput: React.FC<ChatInputProps> = ({ value, onChangeText}) => {
    return (
        <TextInput style={styles.loginInput}
        placeholder='Confirm Password'
        multiline={false}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={true}
        />
    )
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChangeText, onSend }) => {


    
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

    welcomeEmailInput: {
        height: '100%',
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
    },

    loginInput: {
        width: "100%",
        minHeight: Dimensions.get('window').height * 0.055,
        borderWidth: 1.5,
        borderColor: "#D6D6D6",
        borderRadius: Dimensions.get('window').height * 0.015,
        paddingTop: Platform.OS === 'ios' ? 15 : 0,
        paddingBottom: Platform.OS === 'ios' ? 15 : 0,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#F7F7F7",
        fontFamily: "Quicksand-Medium",

    },
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
    invalidLoginInput: {
        borderColor: 'red',
    },

});
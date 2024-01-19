import React from 'react'
import { TextInput, View, StyleSheet, Dimensions } from 'react-native'

export const WelcomeEmailInput: React.FC = () => {
    return (
        <TextInput style={styles.welcomeEmailInput} placeholder='Email' multiline={false} />
    )
}

// Maybe will put LogInEmailInput & LogInPasswordInput two together into a single component

export const LogInEmailInput: React.FC = () => {
    return (
        <TextInput style={styles.loginInput} placeholder='Email' multiline={false} />
    )
}

export const LogInPasswordInput: React.FC = () => {
    return (
        <TextInput style={styles.loginInput} placeholder='Password' multiline={false} />
    )
}

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
        height: Dimensions.get('window').height * 0.06,
        width: Dimensions.get('window').width * 0.75,
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
    },

});
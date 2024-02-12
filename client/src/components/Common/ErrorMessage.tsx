import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

interface Message {
    visible?: 'none' | 'flex' | undefined;
    text?: string

}

export const ErrorMessage: React.FC<Message> = ({visible, text}) => {
    return (
       <View style={{"display" : visible}}>
            <Text style={styles.errorText}>{text}</Text>
       </View>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: "red", 
        justifyContent: "center",
    }
});
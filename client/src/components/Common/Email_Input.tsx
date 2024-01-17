import React from 'react'
import { TextInput, View, StyleSheet, Dimensions } from 'react-native'

interface Email_InputProps {
    flex?: number;
    height?: number;
    width?: number;
};

const Email_Input:React.FC<Email_InputProps> = ({ flex, height, width }) => {
  return (
    <View style={{
        flex: flex,
        height: height,
        width: width,
    }}>
        <TextInput style={styles.input} placeholder="Email" multiline={false}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10,
        height: '100%',
        width: '100%',
    },
});

export default Email_Input
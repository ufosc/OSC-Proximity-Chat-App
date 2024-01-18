import React from 'react'
import { TextInput, View, StyleSheet, Dimensions } from 'react-native'

interface Email_InputProps {
    flex?: number;
    height?: number;
    width?: number;
    placeholder?: string;
};

const Custom_Input:React.FC<Email_InputProps> = ({ flex, height, width, placeholder }) => {
  return (
    <View style={{
        flex: flex,
        height: height,
        width: width,
    }}>
        <TextInput style={styles.input} placeholder={placeholder} multiline={false}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 15,
        paddingRight: 15,
        height: '100%',
        width: '100%',
    },
});

export default Custom_Input
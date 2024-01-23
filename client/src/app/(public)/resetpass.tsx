import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

const ResetPage = () => {
  return (
    <View style={tempStyles.container}>
        <Text>This is where the password reset goes!</Text>
    </View>
  )
}

const tempStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ResetPage;
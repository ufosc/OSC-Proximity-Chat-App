import React from "react";
import { View, StyleSheet } from "react-native";
import SignUpButton from "../Common/SignUpButton";
import LogInButton from "../Common/LogInButton";


const SignUp = () => {
    return (
        <View style={styles.container}>
            <View style={styles.button_container}>
                <SignUpButton />
                <LogInButton />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue"
    },

    button_container: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "25%",
        width: "100%",
        
    },
    }
)

export default SignUp;
import React, {useState} from "react";
import {
    Button,
    Modal,
    SafeAreaView,
    Text,
    TextInput,
    View,
    StyleSheet,
    Pressable,
    TouchableWithoutFeedback
} from "react-native";

type GenericTextInputProps = {
    defaultValue: string;
    isVisible: boolean;
    visibleSetter: Function;
    outputSetter: Function;
    headerText: string;
    errorMessage: string;
    maxLength: number;
    inputValidator: Function;

}

const GenericTextInput = ({
    defaultValue,
    isVisible,
    visibleSetter,
    outputSetter,
    headerText,
    errorMessage,
    maxLength,
    inputValidator,
}: GenericTextInputProps) => {
    const[textInput, setTextInput] = useState('');
    const[error, setError] = useState('');

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                visibleSetter(false);
                setError('');
            }}
        >
            <Pressable onPress={() => {
                visibleSetter(false);
                setError('');
            }}>
            <SafeAreaView style={styles.centeredView}>
                <TouchableWithoutFeedback>
                <View style={styles.inputModal}>
                    <Text style={styles.inputHeader}>{headerText}</Text>
                    <Text style={error==='' ? {display:"none"} : {color: "red"}}>{error}</Text>
                    <TextInput
                        defaultValue={defaultValue}
                        maxLength={maxLength}
                        style={styles.textInput}
                        onChangeText={text => {setTextInput(text); setError('');}}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancel"
                                onPress={() => {
                                    visibleSetter(false);
                                    setError('');
                                }}
                        />
                        <Button title="Save" onPress={() => {
                            if (inputValidator(textInput)) {
                                visibleSetter(false);
                                outputSetter(textInput);
                                defaultValue=textInput;
                                setError('');
                            } else
                                setError(errorMessage);
                        }}
                        />
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
            </Pressable>
        </Modal>
    )};

type InputProps = {
    defaultValue: string;
    isVisible: boolean;
    visibleSetter: Function;
    outputSetter: Function;
};

export const DisplayNameInput = ({
     defaultValue,
     isVisible,
     visibleSetter,
     outputSetter,
}: InputProps) => GenericTextInput({
    defaultValue: defaultValue,
    isVisible: isVisible,
    visibleSetter: visibleSetter,
    outputSetter: outputSetter,
    headerText: "Edit Display Name",
    errorMessage: "Please enter a display name.",
    maxLength: 12,
    inputValidator: (input: string) => input.length > 0,
});

export const ColorInput = ({
     defaultValue,
     isVisible,
     visibleSetter,
     outputSetter,
}: InputProps) => GenericTextInput({
    defaultValue: defaultValue,
    isVisible: isVisible,
    visibleSetter: visibleSetter,
    outputSetter: outputSetter,
    headerText: "Edit Profile Color",
    errorMessage: "Please enter a valid hex code.",
    maxLength: 7,
    inputValidator: (input: string) => (/^#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}$/).exec(input),
});

const styles = StyleSheet.create({
    inputHeader: {
        fontSize: 14,
        fontWeight: "600",
        color: "#a7a7a7",
        textTransform: "uppercase",
        letterSpacing: 1.2,
    },
    centeredView: {
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "rgba(54, 54, 54, 0.5)",
    },
    inputModal: {
        alignItems: "center",
        backgroundColor: "#cccccc",
        marginTop: "50%",
        width: "70%",
        borderRadius: 20,
        padding: "5%",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        paddingHorizontal: "5%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "90%",
    },
    textInput: {
        marginVertical: "5%",
        width: "75%",
        textAlign: "center",
        borderBottomWidth: 2,
        fontSize: 20,
    },
});
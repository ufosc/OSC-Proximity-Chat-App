import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LargeTextButton from "../../components/auth/LargeTextButton";

const EmailVerificationScreen = ({ navigation }: any) => {
  const maxCodeLength = 6;
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hiddenInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    hiddenInputRef.current?.focus();
  };

  const handleChangeText = (text: string) => {
    if (text.length <= maxCodeLength) {
      setCode(text);
      setErrorMessage("");
    }
  };

  const handleSubmit = () => {
    if (!code || code.length < maxCodeLength) {
      setErrorMessage("Please enter a complete 6-digit code.");
      return;
    }

    const validCode = "111111"; // <<<<<< Placeholder for actual verification code HERE
    if (code !== validCode) {
      setErrorMessage("The code you entered is incorrect, please try again.");
      return;
    }

    navigation.navigate("Sign Up"); // <<<<<< Replace with actual navigation target HERE
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <Text style={styles.header_text}>Just one more step!</Text>
          <Text style={styles.subheader_text}>
            Verify your email with the code we just sent you!
          </Text>
        </View>

        <View style={styles.input_container}>
          <TouchableOpacity
            style={styles.boxContainer}
            onPress={handlePress}
            activeOpacity={1}>
            {Array.from({ length: maxCodeLength }).map((_, index) => (
              <View key={index} style={styles.box}>
                <Text style={styles.boxText}>{code[index] || ""}</Text>
              </View>
            ))}
          </TouchableOpacity>

          <TextInput
            ref={hiddenInputRef}
            value={code}
            onChangeText={handleChangeText}
            keyboardType="number-pad"
            maxLength={maxCodeLength}
            style={styles.hiddenInput}
            autoFocus={true}
          />
        </View>

        <View style={styles.button_container}>
          <LargeTextButton onPress={handleSubmit} buttonText="Submit" />
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* REMOVE THIS AFTERWARDS vv*/}
        <Text style={styles.subheader_text}>Try "111111"!</Text>
        {/* REMOVE THIS AFTERWARDS ^^*/}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main_container: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.11,
    paddingVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: "white",
    gap: Dimensions.get("window").height * 0.029,
  },
  input_container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  box: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  boxText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
  },
  button_container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  header_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: Dimensions.get("window").height * 0.019,
    marginTop: Dimensions.get("window").height * 0.17,
  },
  header_text: {
    fontFamily: "Quicksand-Bold",
    fontSize: 37,
    marginBottom: Dimensions.get("window").height * 0.01,
  },
  subheader_text: {
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 13,
  },
});

export default EmailVerificationScreen;

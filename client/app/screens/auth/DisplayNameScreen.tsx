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
import { DisplayNameInput } from "@app/components/common/CustomInputs";

const DisplayNameScreen = ({ navigation }: any) => {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hiddenInputRef = useRef<TextInput>(null);

  const handlePress = () => {
    hiddenInputRef.current?.focus();
  };

  const handleChangeText = (text: string) => {
    setInput(text);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (!input || input.length == 0) {
      setErrorMessage("Please enter a display name");
      return;
    }
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <Text style={styles.header_text}>Just one more step!</Text>
          <Text style={styles.subheader_text}>
            Pick a display name other people will see
          </Text>
        </View>

        <DisplayNameInput
          value={input}
          onChangeText={handleChangeText}
          invalid={errorMessage !== ""}
        />

        <View style={styles.button_container}>
          <LargeTextButton onPress={handleSubmit} buttonText="Submit" />
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
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

export default DisplayNameScreen;

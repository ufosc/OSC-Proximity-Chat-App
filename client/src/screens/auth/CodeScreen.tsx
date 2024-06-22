import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TextInput, Button, Dimensions, TouchableOpacity } from 'react-native';
import { appSignUp } from "../../services/AuthStore";
import { ArrowLeftCircle } from "react-native-feather";

import {
  SignUpButton,
} from "../../components/auth/AuthButtons";
const CodeScreen = ({ route, navigation }: any) => {
  // stores the code entered by the user
  const [code, setCode] = useState(['', '', '', '', '', '']);
  // parameters
  const { email, password} = route.params;

  const [authResponse, setAuthResponse] =
      React.useState<AuthenticationResponse>();
  // handles changes in the code entered by the user
  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };


  // registers user in the database
  const onHandleSubmit = async () => {
    setAuthResponse(await appSignUp(email, password));

    // isLoggedIn boolean is true, which changes navigator to AppNavigator from AuthNavigator
    if (authResponse?.user) {
      console.log("User Logged IN!");

    } else if (authResponse?.error) {
      console.log(authResponse.error);
    }
  };

  // structure for the page
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.back_button}>
        <ArrowLeftCircle
          color="black"
          strokeWidth={1.4}
          width={34}
          height={34}
        />
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Enter the 6 character verification code
      </Text>
      <View style={styles.codeContainer}>
        {code.map((c, index) => (
          <TextInput
            key={index}
            style={styles.codeBox}
            maxLength={1}
            onChangeText={(text) => handleCodeChange(text, index)}
            value={c}
          />
        ))}
      </View>
      <View>
        <SignUpButton onPress={onHandleSubmit} />
      </View>
    </SafeAreaView>
  );
}
// css styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 50,
  },
  codeBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    fontSize: 18,
  },
  back_button: {
    position: "absolute",
    top: Dimensions.get("window").height * 0.075,
    left: Dimensions.get("window").width * 0.075,
  },
});

export default CodeScreen;
import React from "react";
import { TextInput, View } from "react-native";

const EmailPassword = () => {
  return (
    <View>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
    </View>
  );
};

export default EmailPassword;

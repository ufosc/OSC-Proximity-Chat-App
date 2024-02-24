import React from "react";
import { StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

//Type to handle Authentication Responses from firebase
export type AuthenticationResponse = {
  user: User | null;
  error?: undefined;
} | {
  user?: undefined;
  error: unknown;
}

export class CustomError {
  public code: string;
  public message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}

//Custom responses
export const inValidEmailResponse = new CustomError("Invalid Email", "Please provide a valid email address")

//Function that decodes the error code
const decodeFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/missing-email" || "auth/invalid-email":
      return "Please provide a valid email address";
    case "auth/weak-password":
      return "Password must be 6 characters or more";
    case "auth/missing-password":
      return "Please provide a password";
    case "auth/invalid-credential":
      return "The password or email is incorrect";
    case "auth/too-many-requests":
      return "Too many requests, please try again later";
    case "auth/email-already-in-use":
      return "Email already in use";
    default:
      return "Unknown error";
  }
}

const decodeCustomError = (error: CustomError) => {
  return error.message;
}

//Function that handles the response depending on type
function handleResponse(response: AuthenticationResponse) {
  if(response?.user) {
    return "";
  }

  console.log(response.error)

  if(response.error instanceof FirebaseError) {
    return decodeFirebaseError(response.error);
  }

  if(response.error instanceof CustomError) {
    return decodeCustomError(response.error);
  }

  return "Unknown error"
}

//Something
interface AuthenticationErrorMessageProps {
  response: AuthenticationResponse | undefined;
  onPress?: () => void;
}

export const AuthenticationErrorMessage: React.FC<AuthenticationErrorMessageProps> = ({ response, onPress }) => {
  if( response === undefined ) {
    return null;
  }

  const errorMessage = handleResponse(response)

  return (
    errorMessage &&
    <TouchableOpacity style={styles.error_container} onPressIn={onPress}>
        <Text style={styles.error_text}>{errorMessage}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  error_text: {
    color: "white",
    fontSize: Dimensions.get("window").height * 0.02,

  },
  error_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: Dimensions.get("window").height * 0.05,
    marginTop: Dimensions.get("window").height * 0.005,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    padding: 10
  }
});


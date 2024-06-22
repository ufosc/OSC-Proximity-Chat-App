import { FirebaseError } from "@firebase/app";
import { User } from "@firebase/auth";
import React from "react";
import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";

//Type to handle Authentication Responses from firebase
export type AuthenticationResponse =
  | {
      user: User | null;
      error?: undefined;
    }
  | {
      user?: undefined;
      error: unknown;
    };

export class CustomError {
  public code: string;
  public message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}

//Custom responses
export const inValidEmailResponse = new CustomError(
  "Invalid Email",
  "Please provide a valid email address",
);

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
    case "auth/invalid-email":
      return "Invalid email";
    default:
      return "Unknown error";
  }
};

const decodeCustomError = (error: CustomError) => {
  return error.message;
};

//Function that handles the response depending on type
const handleResponse = (response: AuthenticationResponse) => {
  if (response?.user) {
    // If the user is not undefined
    return "";
  }

  if (response.error instanceof FirebaseError) {
    // If the error is a firebase error
    return decodeFirebaseError(response.error);
  }
  // If the error is a custom error
  if (response.error instanceof CustomError) {
    // If the error is a custom error
    return decodeCustomError(response.error);
  }

  return "Unknown error";
};

// Authentication Message Component Props
interface AuthenticationErrorMessageProps {
  response: AuthenticationResponse | undefined;
  onPress?: () => void;
}

export const AuthenticationErrorMessage: React.FC<
  AuthenticationErrorMessageProps
> = ({ response, onPress }) => {
  if (response === undefined) {
    return null;
  }

  const errorMessage = handleResponse(response);

  return (
    errorMessage && (
      <TouchableOpacity style={styles.error_container} onPressIn={onPress}>
        <Text style={styles.error_text}>{errorMessage}</Text>
      </TouchableOpacity>
    )
  );
};

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
    padding: 10,
  },
});

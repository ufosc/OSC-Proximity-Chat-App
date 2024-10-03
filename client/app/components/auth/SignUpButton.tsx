import React from "react";
import LargeTextButton from "./LargeTextButton";

import { SignUpButtonProps } from "../../types/Props";

const SignUpButton: React.FC<SignUpButtonProps> = ({ onPress }) => {
  return (
    <LargeTextButton onPress={onPress} buttonText="Sign Up"/>
  );
};

export default SignUpButton;

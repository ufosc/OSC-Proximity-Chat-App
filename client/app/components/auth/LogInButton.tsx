import React from "react";

import { LogInButtonProps } from "../../types/Props";
import LargeTextButton from "./LargeTextButton"

const LogInButton: React.FC<LogInButtonProps> = ({ onPress }) => {
  return (
    <LargeTextButton onPress={onPress} buttonText="Log In" />
  );
};

export default LogInButton;

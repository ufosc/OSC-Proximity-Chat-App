import { UserType } from "../types/User";
import { generateName } from "@app/utils/scripts";

// Function to initialize default user
export const initializeUser = (): UserType => {
  return {
    displayName: generateName(),
    userIcon: {
      imagePath: "DefaultImagePath",
      colorHex: "#fff",
    },
  };
};

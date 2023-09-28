import { Text, View } from "react-native";
import { LocationContext } from "../constants/LocationContext";

export const DisplayLocation = () => {
  return (
    <LocationContext.Consumer>
      {(ctx) => {
        return (
          <View>
            <Text>{JSON.stringify(ctx.location)}</Text>
            <Text>{JSON.stringify(ctx.address?.at(0))}</Text>
          </View>
        );
      }}
    </LocationContext.Consumer>
  );
};

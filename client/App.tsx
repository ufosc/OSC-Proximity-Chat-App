import { StyleSheet, View } from "react-native";
import DisplayLocation from "./src/components/DisplayLocation";

export default function App() {
  return (
    <View style={styles.container}>
      <DisplayLocation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

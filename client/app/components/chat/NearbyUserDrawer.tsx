import * as React from "react";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Button } from "react-native";

export const NearbyUserDrawer = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType={"front"}
      renderDrawerContent={() => {
        return (
          <View style={styles.drawerContent}>
            <Text>Drawer content</Text>
          </View>
        );
      }}>
      <Button
        onPress={() => setOpen((prevOpen) => !prevOpen)}
        title={`${open ? "Close" : "Open"} drawer`}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
  },
});

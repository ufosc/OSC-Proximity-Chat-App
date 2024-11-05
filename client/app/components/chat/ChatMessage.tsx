import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";

import { useSettings } from "../../contexts/SettingsContext";
import { MessageProps } from "../../types/Props";

const Message: React.FC<MessageProps> = ({ messageContent, time, author }) => {
  const settings = useSettings();
  const currDay = new Date(Date.now()).toLocaleDateString([], {
    weekday: "long",
  })
  let weekday = new Date(time).toLocaleDateString([], {
    weekday: "long",
  })
  if (weekday === currDay) weekday = "Today"
  const timestamp = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // Text should have a different color to contrast with the background color
  const authorStyleProps = {
    ...styles.authorStyle,
    color: settings && settings.theme !== "light" ? "white" : "black",
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={require("../../../assets/icons/user/fake_pfp.jpg")}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.messageHeader}>
          <Text style={authorStyleProps}>{author}</Text>
          <Text
            style={{
              color: settings && settings.theme !== "light" ? "white" : "black",
              fontSize: 12,
            }}>
            {[weekday, " at ", timestamp]}
          </Text>
        </View>
        <View style={styles.messageContent}>
          <Text
            style={{
              color: settings && settings.theme !== "light" ? "white" : "black",
            }}>
            {messageContent}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    elevation: 1,
    color: "white",
  },

  profileImageContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 10,
    flex: 1,
    flexShrink: 1,
  },

  contentContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    flex: 6,
    flexShrink: 1,
  },

  messageHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  messageContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
  },

  authorStyle: {
    fontWeight: "bold",
    fontSize: Dimensions.get("window").height * 0.018,
  },

  profileImage: {
    height: Dimensions.get("window").height * 0.055,
    width: Dimensions.get("window").height * 0.055,
    borderRadius: 100,
  },
});

export default Message;

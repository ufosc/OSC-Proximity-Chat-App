import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, Image, Pressable, Modal, Button } from "react-native";

import { SettingsItem } from "../../components/settings/SettingsItem";

// List of settings items
// toggle type: a switch
// select type: arrow to the right to switch pages
const Sections = [
  {
    header: "Notifications",
    items: [
      {
        id: "notifiyNewMessage",
        title: "Notifications for new messages",
        type: "toggle",
      },
    ],
  },
  {
    header: "Preferences",
    items: [
      { id: "darkMode", title: "Dark Mode", type: "toggle" },
      { id: "language", title: "Language", type: "select" },
    ],
  },
  {
    header: "Privacy",
    items: [{ id: "deleteMessages", title: "Delete messages", type: "toggle" }],
  },
];

const SettingsScreen: React.FC = () => {
  // settings values (will be changed later to reflect the actual settings)
  const [data, setData] = useState({
    displayName: "Display Name",
    profilePic: require("../../../assets/icons/user/face_01.png"),
    profileColor: "#1199ff",
    notifyNewMessage: true,
    darkMode: false,
    language: "English",
    deleteMessages: false,
  });

  const[profileVisible, setProfileVisible] = useState(false);
  const iconStyle = [styles.icon, {backgroundColor: data.profileColor}]


  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView style={styles.container}>

        <Modal
            animationType="fade"
            transparent={true}
            visible={profileVisible}
            onRequestClose={() => setProfileVisible(false)}
        >
          <SafeAreaView style={{flex:1}}>
            <View style={styles.userModal}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Hi {data.displayName}!</Text>
                <Text>    </Text>
                <Pressable onPress={() => setProfileVisible(false)}>
                  <Image
                      style={iconStyle}
                      source={data.profilePic}
                  />
                </Pressable>
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Edit Profile</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Button
                      title="Edit Display Name"
                  />
                  <Button
                      title="Edit Profile Color"
                  />
                </View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Change profile picture</Text>
                </View>
                <View style={styles.sectionContent}>

                </View>
              </View>
            </View>
          </SafeAreaView>
        </Modal>

        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
          <Pressable onPress={() => setProfileVisible(true)}>
            <Image
                style={iconStyle}
                source={data.profilePic}
            />
          </Pressable>
        </View>

        {Sections.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionContent}>
              {items.map(({ id, title, type }) => (
                <SettingsItem
                  key={id}
                  id={id}
                  title={title}
                  type={type}
                  setter={setData}
                  data={data}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Styles
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  container: {
    paddingVertical: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  sectionContent: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  userModal: {
    flex: 1,
    backgroundColor: "#d4d4d4",
    borderRadius: 10,
    paddingVertical: 24,
    marginLeft: "auto",
    maxHeight: "65%",
  },
});

export default SettingsScreen;

import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";

import { SettingsItem } from "../../components/settings/SettingsItem";
import { SignOutButton } from "../../components/auth/AuthButtons";

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
    notifyNewMessage: true,
    darkMode: false,
    language: "English",
    deleteMessages: false,
  });

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
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
        <SignOutButton/>
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
});

export default SettingsScreen;

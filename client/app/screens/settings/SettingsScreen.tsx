import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SettingsItem } from "../../components/settings/SettingsItem";
import { appSignOut } from "../../services/AuthStore";

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
  {
    header: "Manage Account",
    items: [{ id: "signOut", title: "Sign Out", type: "select" }],
  }
];

const SettingsScreen: React.FC = () => {
  const [data, setData] = useState({
    notifyNewMessage: true,
    darkMode: false,
    language: "English",
    deleteMessages: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: async () => {
            setLoading(true);
            const response = await appSignOut();
            setLoading(false);

            if (response?.user === null) {
              console.log("Sign out successful");
            } else if (response?.error) {
              console.log(response.error);
              Alert.alert(
                "Sign Out Failed",
                "An error occurred during sign out. Please try again.",
              );
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

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
              {items.map(({ id, title, type }) => {
                if (id === "signOut") {
                  return (
                    <TouchableOpacity
                      key={id}
                      style={styles.signOutRow}
                      onPress={handleSignOut}
                      disabled={loading}
                    >
                      <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                  );
                }

                return (
                  <SettingsItem
                    key={id}
                    id={id}
                    title={title}
                    type={type}
                    setter={setData}
                    data={data}
                  />
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  signOutRow: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "red",
  },
});

export default SettingsScreen;
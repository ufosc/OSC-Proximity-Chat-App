import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  Modal,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert
} from "react-native";

import { SettingsItem } from "../../components/settings/SettingsItem";
import {ColorInput, DisplayNameInput} from "@app/components/settings/TextInputs";
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
    items: [{ id: "deleteMessages", title: "Delete my messages when I disappear", type: "toggle" }],
  },
  {
    header: "Manage Account",
    items: [{ id: "signOut", title: "Sign Out", type: "select" }],
  }
];

const SettingsScreen: React.FC = () => {
  const [data, setData] = useState({
    displayName: "Display Name",
    profilePicIndex: 0, // index for icons array
    profileColor: "#1199ff",
    notifyNewMessage: true,
    darkMode: false,
    language: "English",
    deleteMessages: false,
  });

  const[profileVisible, setProfileVisible] = useState(false);
  const[inputVisible, setInputVisible] = useState({
    displayName: false,
    profileColor: false,
  });


  const iconStyle = [styles.icon, {backgroundColor: data.profileColor}]

  const icons = [
    require("../../../assets/icons/user/face_01.png"),
    require("../../../assets/icons/user/face_02.png"),
    require("../../../assets/icons/user/face_03.png"),
    require("../../../assets/icons/user/face_04.png"),
    require("../../../assets/icons/user/face_05.png"),
    require("../../../assets/icons/user/face_06.png"),
    require("../../../assets/icons/user/face_07.png"),
    require("../../../assets/icons/user/fake_pfp.jpg"),
  ];

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

        {/* User Settings Menu */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={profileVisible}
            onRequestClose={() => setProfileVisible(false)}
        >

          <Pressable onPress={() => setProfileVisible(false)}>
          <SafeAreaView style={{height:"100%"}}>
            <TouchableWithoutFeedback>
              <View style={styles.userModal}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Hi {data.displayName}!</Text>
                  <Text>    </Text>
                  <Pressable onPress={() => setProfileVisible(false)}>
                    <Image
                        style={iconStyle}
                        source={icons[data.profilePicIndex]}
                    />
                  </Pressable>
                </View>

                <DisplayNameInput
                 defaultValue={data.displayName}
                 isVisible={inputVisible.displayName}
                 visibleSetter={(value: boolean) => setInputVisible({...inputVisible, ["displayName"]: value})}
                 outputSetter={(output: string) => setData({...data, ["displayName"]: output})}
                />
                <ColorInput
                    defaultValue={data.profileColor}
                    isVisible={inputVisible.profileColor}
                    visibleSetter={(value: boolean) => setInputVisible({...inputVisible, ["profileColor"]: value})}
                    outputSetter={(output: string) => setData({...data, ["profileColor"]: output})}
                />

                {/* User Settings */}
                <View style={[styles.section, {height:"100%"}]}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Edit Profile</Text>
                  </View>
                  <View style={styles.sectionContent}>
                    <Button
                        title="Edit Display Name"
                        onPress={() => setInputVisible({...inputVisible, ["displayName"]: true})}
                    />
                    <Button
                        title="Edit Profile Color"
                        onPress={() => setInputVisible({...inputVisible, ["profileColor"]: true})}
                    />
                  </View>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Change profile picture</Text>
                  </View>
                  <View style={[styles.sectionContent, {alignItems: "center"}]}>
                    <FlatList data={icons}
                              numColumns={6}
                              renderItem={icon => (
                                  <Pressable onPress={() => setData({ ...data, ["profilePicIndex"]: icon.index })}>
                                    <Image style={[iconStyle, icon.index === data.profilePicIndex ? styles.selected:{margin: 5}]}
                                           source={icon.item}/>
                                  </Pressable>
                              )}>
                    </FlatList>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
          </Pressable>
        </Modal>

        {/* Settings Screen */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
          <Pressable onPress={() => setProfileVisible(true)}>
            <Image
                style={iconStyle}
                source={icons[data.profilePicIndex]}
            />
          </Pressable>
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
  selected: {
    borderWidth: 3,
    borderColor: "yellow",
    margin: 5,
  },
  userModal: {
    backgroundColor: "#d4d4d4",
    borderRadius: 10,
    paddingVertical: 24,
    marginLeft: "auto",
    height: "50%", // For some reason I can't get the view to auto fit height to children so just set to 50% for now
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

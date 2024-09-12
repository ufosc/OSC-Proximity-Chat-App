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
  TouchableWithoutFeedback
} from "react-native";

import { SettingsItem } from "../../components/settings/SettingsItem";
import {ColorInput, DisplayNameInput} from "@app/components/settings/TextInputs";

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
});

export default SettingsScreen;

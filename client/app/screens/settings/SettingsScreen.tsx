import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView, Image, Pressable, Modal, Button, FlatList, TextInput } from "react-native";

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
    profilePicIndex: 0, // index for icons array
    profileColor: "#1199ff",
    notifyNewMessage: true,
    darkMode: false,
    language: "English",
    deleteMessages: false,
  });

  const[profileVisible, setProfileVisible] = useState(false);
  const[inputModal, setInputModal] = useState({
    visible: false,
    type: -1 // 0 for display name, 1 for profile color
  });
  const[textInput, setTextInput] = useState('');
  const[errorMessage, setErrorMessage] = useState('');

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
          <SafeAreaView style={{flex:1}}>
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

              {/* Text Input */}
              <Modal
                  animationType="fade"
                  transparent={true}
                  visible={inputModal.visible}
                  onRequestClose={() => setInputModal({visible: false, type: -1})}
              >
                <SafeAreaView style={styles.centeredView}>
                  <View style={styles.inputModal}>
                    <Text style={styles.sectionHeaderText}>{["Edit Display Name", "Edit Profile Color"][inputModal.type]}</Text>
                    <Text style={errorMessage==='' ? {display:"none"} : {color: "red"}}>{errorMessage}</Text>
                    <TextInput
                        defaultValue={[data.displayName, data.profileColor][inputModal.type]}
                        maxLength={[12, 7][inputModal.type]}
                        style={styles.textInput}
                        onChangeText={text => {setTextInput(text); setErrorMessage('');}}
                    />
                    <View style={styles.buttonContainer}>
                      <Button title="Cancel"
                              onPress={() => {
                                setInputModal({visible: false, type:-1});
                                setErrorMessage('');
                              }}
                      />
                      <Text>            </Text>
                      <Button title="Save" onPress={() => {
                        if (inputModal.type === 0) {
                          if (textInput.length > 0) {
                            setInputModal({visible: false, type: -1});
                            setData({...data, ["displayName"]: textInput});
                            setErrorMessage('');
                          } else
                            setErrorMessage("Please enter a display name.");
                        } else if (inputModal.type === 1){
                          const re = /^#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}$/;
                          if (re.exec(textInput)) {
                            setInputModal({visible: false, type: -1});
                            setData({...data, ["profileColor"]: textInput});
                            setErrorMessage('');
                          } else
                            setErrorMessage("Please enter a valid hex code.");
                        }}}
                      />
                    </View>
                  </View>
                </SafeAreaView>
              </Modal>

              {/* User Settings */}
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>Edit Profile</Text>
                </View>
                <View style={styles.sectionContent}>
                  <Button
                      title="Edit Display Name"
                      onPress={() => {
                        setInputModal({visible: true, type: 0});
                        setTextInput(data.displayName);
                      }}
                  />
                  <Button
                      title="Edit Profile Color"
                      onPress={() => {
                        setInputModal({visible: true, type: 1});
                        setTextInput(data.profileColor);
                      }}
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
          </SafeAreaView>
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
    maxHeight: "65%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(54, 54, 54, 0.5)",
  },
  inputModal: {
    alignItems: "center",
    backgroundColor: "#cccccc",
    marginTop: "50%",
    width: "70%",
    borderRadius: 20,
    padding: "5%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    paddingHorizontal: "5%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    marginVertical: "5%",
    width: "75%",
    textAlign: "center",
    borderBottomWidth: 2,
    fontSize: 20,
  },
});

export default SettingsScreen;

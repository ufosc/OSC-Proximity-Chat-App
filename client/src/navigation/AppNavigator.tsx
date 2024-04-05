import * as React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatScreen from "../screens/chat/ChatScreen"
import SettingsScreen from "../screens/settings/SettingsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={ChatScreen} />
        <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default AppNavigator
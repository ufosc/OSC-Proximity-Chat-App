import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {StyleSheet, Text, View} from 'react-native';
import * as React from "react";

import { LocationProvider } from "../contexts/LocationContext";
import { SocketProvider } from "../contexts/SocketContext";
import { UserProvider } from "../contexts/UserContext";
import ChatScreen from "../screens/chat/ChatScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { Home } from "react-native-feather";
import {User} from "react-native-feather";

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <UserProvider>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 15,
              }
            }}>
            <Tab.Screen name="Home" component={ChatScreen} options={{
              tabBarIcon:({ focused, color, size }) => {
                return(<Home width = {size} stroke = {color}/>
                )
              }
            }
            }/>
            <Tab.Screen name="Profile" component={SettingsScreen} options = {{
              tabBarIcon:({ focused, color, size }) => {
                return(<User width = {size} stroke = {color} />)
              }
            }
            }
            />
          </Tab.Navigator>
        </UserProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AppNavigator;

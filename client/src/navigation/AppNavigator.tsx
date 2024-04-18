import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
} from 'react-native';
import ChatScreen from "../screens/chat/ChatScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { SocketProvider } from "../contexts/SocketContext";
import { LocationProvider } from "../contexts/LocationContext";
import { UserProvider } from "../contexts/UserContext";
import { Map, Settings, MessageSquare } from "react-native-feather";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <LocationProvider>
      <SocketProvider>
        <UserProvider>
          <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#EFEFEF',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
            
          }}>
            <Tab.Screen 
            name="Map"
            component={ChatScreen}
            options={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#34D1BF',
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 3, left: 5}}>
                  <Map
                    color={'black'}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />
                  <Text
                  style={{color: focused ? '#34D1BF' : 'black', fontSize: 10, top: 2,}}>
                    Map
                  </Text>
                
                </View>
              )
            }}
            />
            <Tab.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#34D1BF',
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                  <MessageSquare
                    color={'black'}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />
                  <Text
                  style={{color: focused ? '#34D1BF' : 'black', fontSize: 10, top: 2}}>
                    Chat
                  </Text>
                
                </View>
              )
            }} />
            <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: '#34D1BF',
              tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center', top: 3, right: 5}}>
                  <Settings
                    color={'black'}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />
                <Text
                  style = {{color: focused ? '#34D1BF' : 'black', fontSize: 10, top: 2}}>
                  Settings
                  </Text>
                </View>
              )
            }}
            />
          </Tab.Navigator>
        </UserProvider>
      </SocketProvider>
    </LocationProvider>
  );
};

export default AppNavigator;

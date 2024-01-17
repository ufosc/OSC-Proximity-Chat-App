import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={
            {
                // Make header smaller
                headerStyle: {
                    height: 50,
                },
            }
        }>
            <Tabs.Screen name="index" options={
                {
                    headerTitle: "Home",
                    title: "Home",
                }
            }/>
            <Tabs.Screen name="users/[id]" options={
                {
                    headerTitle: "User",
                    title: "User",
                }
            }/>
            <Tabs.Screen name="SettingScreen" options={
                {
                    headerTitle: "Settings",
                    title: "Settings",
                }
            } />
        </Tabs>
    );
};

export default TabsLayout;
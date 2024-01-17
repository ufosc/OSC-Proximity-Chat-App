import { Link, router } from "expo-router";
import React from "react";
import { View, Text, Pressable } from "react-native";

const HomePage = () => {
    return (
        <View>
            <Text>Home Page</Text>
            <Link href="/users/1">Go to user 1</Link>
            <Pressable onPress={() => router.push("/users/2")}>
                <Text>Go to user 2</Text>
            </Pressable>
        </View>
    );
};

export default HomePage;
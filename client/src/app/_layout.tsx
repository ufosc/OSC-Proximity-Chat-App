import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';

const RootLayout = () => {

    const { isLoaded, isSignedIn } = { isLoaded: true, isSignedIn: false } // Test values for signed in and loaded

    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        const inTabsGroup = segments[0] === '(auth)';

        if (isSignedIn && !inTabsGroup) {
            router.replace('chatchannel');
        } else if (!isSignedIn && inTabsGroup) {
            router.replace('welcome');
        }


    }, [isSignedIn]);

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootLayout;
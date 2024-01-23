import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

const RootLayout = () => {
  const { isLoaded, isSignedIn } = { isLoaded: true, isSignedIn: false }; // Test values for signed in and loaded

  const segments = useSegments();
  const router = useRouter();

  const navigateBasedOnAuthStatus = async () => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('chatchannel');
    } else if (!isSignedIn && inTabsGroup) {
      router.replace('welcome');
    }
  };

  useEffect(() => {

    navigateBasedOnAuthStatus();
  }, [isSignedIn, isLoaded, router, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

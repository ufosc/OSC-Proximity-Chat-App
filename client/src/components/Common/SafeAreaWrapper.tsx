import React from 'react';
import { SafeAreaView, Platform, StyleSheet, StatusBar } from 'react-native';

interface SafeAreaWrapperProps {
  children: React.ReactNode;

}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.mainSafeArea}>{children}</SafeAreaView>
    </>
  ) : (
    <>
      <SafeAreaView style={styles.androidSafeArea}>
        {children}
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: 'white', // Replace with your desired color
  },
  mainSafeArea: {
    flex: 1,
    backgroundColor: 'white', // Replace with your desired color
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'white', // Replace with your desired color
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default SafeAreaWrapper;
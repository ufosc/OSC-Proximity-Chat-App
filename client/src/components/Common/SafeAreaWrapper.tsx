import React from 'react';
import { SafeAreaView, Platform, StyleSheet } from 'react-native';

interface SafeAreaWrapperProps {
    children: React.ReactNode;
    
}

const SafeAreaWrapper:React.FC<SafeAreaWrapperProps> = ({ children }) => {
  return Platform.OS === 'ios' ? (
    <>
      <SafeAreaView style={styles.topSafeArea} />
      <SafeAreaView style={styles.mainSafeArea}>{children}</SafeAreaView>
    </>
  ) : (
    <>{children}</>
  );
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: '#000', // Replace with your desired color
  },
  mainSafeArea: {
    flex: 1,
  },
});

export default SafeAreaWrapper;
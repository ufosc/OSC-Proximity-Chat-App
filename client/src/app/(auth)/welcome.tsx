import React from 'react'
import WelcomeScreen from '../../components/Home/WelcomeScreen';
import { router } from 'expo-router';
import SafeAreaWrapper from '../../components/Common/SafeAreaWrapper';

const WelcomePage = () => {
  return (
    <SafeAreaWrapper>
      <WelcomeScreen />
    </SafeAreaWrapper>
  )
}

export default WelcomePage;
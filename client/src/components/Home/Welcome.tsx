import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Custom_Input from '../Common/Custom_Input';



const Welcome = () => {

  const keyboardVerticalOffest = Platform.OS === "ios" ? 0 : 0;
  const keyboardBehavior = Platform.OS === "ios" ? "padding" : undefined;

  const [fontsLoaded, fontError] = useFonts({
    'Gilroy-ExtraBold': require('../../../assets/fonts/Gilroy-ExtraBold.otf'),
    'Gilroy-Light': require('../../../assets/fonts/Gilroy-Light.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior} keyboardVerticalOffset={keyboardVerticalOffest}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.main_container}>

          <View style={styles.sub_container}>

            <View style={styles.image_container}>
              <Image style={styles.image} source={require('../../../assets/talking_location.png')} />
            </View>

            <Text style={styles.header_text}>Welcome to Proximity Chat!</Text>

            <View style={styles.info_container}>

              <View style={styles.login_container}>

                <Text style={styles.login_text}>Log in</Text>

                <View style={styles.login_mini_container}>

                  <Custom_Input flex={1} height={Dimensions.get('window').width * 0.11} placeholder='Email' />

                  <TouchableOpacity style={styles.login_button}>
                    <Image style={styles.arrow_image} source={require('../../../assets/angle-right.png')} />
                  </TouchableOpacity>

                </View>

              </View>
              <Text>
                Don't have an account? <Link style={styles.link} href="/login">Sign up!</Link>
              </Text>
            </View>
          </View>

        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  image: {
    maxWidth: Dimensions.get("window").width * 1,
    maxHeight: Dimensions.get("window").height * 0.37,
    resizeMode: "contain",
  },

  header_text: {
    fontFamily: "Gilroy-ExtraBold",
    fontSize: Dimensions.get("window").width * 0.07,
  },

  login_text: {
    fontFamily: "Gilroy-Light",
    fontSize: Dimensions.get("window").width * 0.049,
    marginLeft: Dimensions.get("window").width * 0.02,
  },

  main_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: '100%',
    width: '100%',
    justifyContent: "flex-end",

  },

  sub_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.75,
  },

  info_container: {
    width: Dimensions.get("window").width * 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    minHeight: Dimensions.get("window").height * 0.35,

  },

  login_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.09,
  },

  image_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  login_mini_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  login_button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.105,
    height: Dimensions.get("window").width * 0.105,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    boxShadow: "0px 0px 34px -3px rgba(0,0,0,0.1)",
    marginLeft: Dimensions.get("window").width * 0.02,
  },

  arrow_image: {
    width: Dimensions.get("window").width * 0.05,
    height: Dimensions.get("window").width * 0.05,
    resizeMode: "contain",
  },

  link: {
    color: "#5dbea3",
    textDecorationLine: "underline",
  }

});

export default Welcome
import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Email_Input from '../Common/Email_Input';

const Welcome = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.main_container}>

          <Image style={styles.image} source={require('../../../assets/cute_tree_cropped.png')}/>
          <Text>Welcome to Proximity Chat</Text>

          <View style={styles.login_container}>

            <Text>Log in</Text>

            <View style={styles.login_mini_container}>
              
              <Email_Input flex={1} height={Dimensions.get('window').width * 0.11} />

              <TouchableOpacity style={styles.login_button}>
                <Image style={styles.arrow_image} source={require('../../../assets/angle-right.png')} />
              </TouchableOpacity>

            </View>

          </View>

      </View>

    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").height * 0.15,
    resizeMode: "contain",
    borderColor: "#5dbea3",
    borderWidth: 1,
  },

  main_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: '100%',
    width: '100%',
    
  },

  login_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.8,
    borderColor: "#5dbea3",
    borderWidth: 1,
  },

  login_mini_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  login_button: {
    backgroundColor: "#5dbea3",
    width: Dimensions.get("window").width * 0.11,
    height: Dimensions.get("window").width * 0.11,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    boxShadow: "0px 0px 34px -3px rgba(0,0,0,0.1)",
    marginLeft: Dimensions.get("window").width * 0.02,
  },

  arrow_image: {
    width: Dimensions.get("window").width * 0.06,
    height: Dimensions.get("window").width * 0.06,
    resizeMode: "contain",
  },

});

export default Welcome
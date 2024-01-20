import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';

interface MessageProps {
  messageContent: string,
  // timestamp: Date, (This will be added later inside the message object passed in)
  author: string,
};

const Message:React.FC<MessageProps> = ({ messageContent, author}) => {
  const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (

    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <Image style={styles.profileImage} source={require('../../../assets/user_icons/fake_pfp.jpg')} />
      </View>
      <View style={styles.contentContainer}>

        <View style={styles.messageHeader}>
          <Text style={styles.authorStyle}>{author}</Text>
          <Text>{timestamp}</Text>

        </View>
        <View style={styles.messageContent}>
          <Text>{messageContent}</Text>

        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    elevation: 1,
  },

  profileImageContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
    flex: 1,
    flexShrink: 1,
  },

  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    flex: 6,
    flexShrink: 1,
  },

  messageHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  messageContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },

  authorStyle: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height * 0.018,
  },

  profileImage: {
    height: Dimensions.get('window').height * 0.055,
    width: Dimensions.get('window').height * 0.055,
    borderRadius: 100,
  }
});


export default Message
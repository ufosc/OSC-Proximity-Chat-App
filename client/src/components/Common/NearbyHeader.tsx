
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'

interface CounterProps {
    count: number;
  }

export const NearbyHeader: React.FC<CounterProps> = ({ count }) => {
    return (
        <View style={styles.nearbyContainer}>
        <View style={{flexDirection: "row"}}>
        <Text style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'black',
                textAlign:"left",
                width: "35%",
                marginLeft: "5%",
            }}>Nearby</Text>
            <View style={styles.iconContainer}>
                <View style={styles.iconAndCount}>
            <Image style={styles.iconImage} source={require("../../../assets/nearby_icon.png")}/>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                textAlign:"center",
                width: "50%",
            }}>{count}</Text>
            </View>
            </View>
            </View>
        </View>
    )
  }



  const styles = StyleSheet.create({
  nearbyContainer: {
    paddingTop: Dimensions.get('window').height * 0.01,
    paddingBottom: Dimensions.get('window').height * 0.01,
    flexDirection:'row',
    alignItems: "center",
    
  },
  iconImage:{
    height: Dimensions.get('window').height * 0.025,
    width: Dimensions.get('window').height * 0.03,
    
    },
    iconContainer:{
        width: "50%"
    },
    iconAndCount:{
        alignSelf: "flex-end",
        alignItems: "center"
    }
});

export default NearbyHeader;

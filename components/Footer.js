import * as React from 'react';
import {Image, Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import {Col, Row} from "react-native-easy-grid";
import AnodinaRegular from "./AnodinaRegular";

export function Footer(props) {
  return ( <Row style={[styles.tabBarInfoContainer, {backgroundColor: '#48BEFF'}]}>
    <Col style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,

    }}>
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',}} onPress={()=> { props.navigation.navigate('')}}>
      <Image
          style={{width: 50, height: 50,marginBottom:10}}
          source={require('../assets/images/iconfinder_boy_person_avatar_kid_4043238.png')}/>
      <AnodinaRegular style={{fontSize: 22, color: 'white', textAlign: 'center'}}>
        Profile
      </AnodinaRegular>
      </TouchableOpacity>
    </Col>
    <Col style={{
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    }}>
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center',}} onPress={()=> { props.navigation.navigate('')}}>
      <Image
          style={{width: 50, height: 50,marginBottom:10}}
          source={require('../assets/images/Group-4.png')}/>
      <AnodinaRegular style={{fontSize: 22, color: 'white', textAlign: 'center'}}>
        Leaderboard
      </AnodinaRegular>
      </TouchableOpacity>
    </Col>


  </Row>);
}
const styles = StyleSheet.create({
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {

      },
      android: {

      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
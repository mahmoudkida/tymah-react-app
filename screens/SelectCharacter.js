import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Query  } from '@apollo/client';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import CHARACTERS_QUERY from '../quiries/characters';

export default function SelectCharacter() {
  return (
    <View style={[styles.container,{backgroundColor: Colors.whiteBlue}]}>
      <ScrollView style={[styles.container,,{backgroundColor: Colors.whiteBlue}]} contentContainerStyle={styles.contentContainer}>
        <Row>
        <Query query={CHARACTERS_QUERY}>
        {({ data: { characters } }) => {
              return    <Col size={50}>

              </Col>;
            }}
     
        </Query>
        </Row>
      </ScrollView>
    </View>
  );
}

SelectCharacter.navigationOptions = {
  header: null,
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
 
});

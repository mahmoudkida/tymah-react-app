import {default as React, useEffect, useState} from "react";
import {AsyncStorage, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import {Header} from "../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import {MainButton} from "../components/MainButton";
import {Footer} from "../components/Footer";

export default function Videos(props) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let userStorageData = {};
    AsyncStorage.getItem('userData').then((data) => {
      if (data) {
        userStorageData = JSON.parse(data);
        setUserData(userStorageData);
      }
    });
  })
  return (
      <SafeAreaView  style={styles.container}>
        <Header showBack={true} navigation={props.navigation}/>

        <ScrollView style={[styles.container]}
                    contentContainerStyle={[styles.contentContainer, {
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign:'center'
                    }]}>


        </ScrollView>


      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48BEFF',
    paddingTop: 20
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
        shadowOffset: {width: 0, height: -3},
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

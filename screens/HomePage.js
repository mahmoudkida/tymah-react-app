import * as React from 'react';
import {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MainButton} from "../components/MainButton";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";

export default function HomePage(props) {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        let userStorageData = {};
        // AsyncStorage.getItem('userData').then((data) => {
        //     if (data) {
        //         userStorageData = JSON.parse(data);
        //         setUserData(userStorageData);
        //     }
        // });
    })
    return (
        <SafeAreaView style={styles.container}>
            <Header/>

            <ScrollView style={[styles.container]}
                        contentContainerStyle={[styles.contentContainer, {
                            paddingTop: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}>
                <MainButton
                    handler={() => {
                        props.navigation.navigate('Videos')
                    }}
                    backgroundImage={require("../assets/images/Mask-group.png")}
                    buttonIcon={require("../assets/images/212121.png")}
                    text="Watch Video"
                />
                <View style={{marginVertical: 20}}/>

                <MainButton
                    backgroundImage={require("../assets/images/Mask-group-2.png")}
                    buttonIcon={require("../assets/images/223232311.png")}
                    text="Play Games"
                />
                <View style={{marginVertical: 20}}/>
                <MainButton
                    backgroundImage={require("../assets/images/Mask-group-3.png")}
                    buttonIcon={require("../assets/images/Untitled-15.png")}
                    text="Learn & Grow"
                />

            </ScrollView>

            <Footer/>

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

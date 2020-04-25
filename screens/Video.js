import {default as React, useEffect, useRef, useState} from "react";
import {AsyncStorage, Image, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Header} from "../components/Header";
import YoutubePlayer from 'react-native-youtube-iframe';
import AnodinaRegular from "../components/AnodinaRegular";

export default function Videos(props) {
    const [userData, setUserData] = useState({});
    const playerRef = useRef(null);
    const [playing, setPlaying] = useState(true);
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
        <SafeAreaView style={styles.container}>
            <Header showBack={true} navigation={props.navigation}/>

            <View>

                <View style={{borderRadius: 15, marginTop: 30, marginHorizontal: 15, marginBottom: 0}}>
                    <YoutubePlayer

                        ref={playerRef}
                        height={250}
                        width={'100%'}
                        videoId={props.route.params.videoId}
                        play={playing}
                        playbackRate={1}
                        playerParams={{
                            cc_lang_pref: "us",
                            showClosedCaptions: true
                        }}
                    />
                </View>
                <AnodinaRegular style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: 'white',
                    marginBottom: 15,
                    paddingHorizontal: 15
                }}>
                    {props.route.params.videoTitle}
                </AnodinaRegular>
                <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => {
                        props.navigation.goBack()
                    }}>
                    <Image source={require('../assets/images/button-arrow-reverse.png')}
                           style={{width: 100, height: 100}}
                    />
                </TouchableOpacity>
            </View>


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

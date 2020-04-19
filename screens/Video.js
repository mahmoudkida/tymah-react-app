import {default as React, useEffect, useRef, useState} from "react";
import {AsyncStorage, Image, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Header} from "../components/Header";
import YoutubePlayer from 'react-native-youtube-iframe';

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

                <View style={{marginHorizontal: 15, borderRadius: 15, marginTop: 30}}>
                    <YoutubePlayer

                        ref={playerRef}
                        height={300}
                        width={'100%'}
                        videoId={props.route.params.videoId}
                        play={playing}
                        onChangeState={event => console.log(event)}
                        onReady={() => console.log("ready")}
                        onError={e => console.log(e)}
                        onPlaybackQualityChange={q => console.log(q)}
                        volume={50}
                        playbackRate={1}
                        playerParams={{
                            cc_lang_pref: "us",
                            showClosedCaptions: true
                        }}
                    />
                </View>
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

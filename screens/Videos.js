import {default as React, useEffect, useState} from "react";
import {AsyncStorage, Platform, SafeAreaView, StyleSheet, View} from "react-native";
import {Header} from "../components/Header";
import {ScrollView} from "react-native-gesture-handler";
import Query from "../utils/query";
import VIDEOCATEGORIES_QUERY from "../quiries/videocategories";
import {VideosSection} from "../components/VideosSection";
import URLs from "../constants/URLs";

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
        <SafeAreaView style={styles.container}>
            <Header showBack={true} navigation={props.navigation}/>

            <ScrollView>


                <Query query={VIDEOCATEGORIES_QUERY} id={null}>
                    {({data: {videocategories}}) => {

                        return (
                            <View>
                                {videocategories.map(
                                    (videoCategory, index) => {
                                        return (
                                            <VideosSection
                                                navigation={props.navigation}
                                                first={index === 0}
                                                style={{marginTop: index !== 0 ? -120 : 0}}
                                                last={index === videocategories.length - 1}
                                                key={index} title={videoCategory.name}
                                                videos={videoCategory.videos}
                                                background={{uri: videoCategory.background ? URLs.API_URL + videoCategory.background.url : URLs.API_URL}}/>
                                        )
                                    }
                                )
                                }
                            </View>
                        )

                    }}

                </Query>


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

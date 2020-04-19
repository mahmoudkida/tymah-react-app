import * as React from 'react';
import {AsyncStorage, Image, Text, TouchableOpacity, View} from 'react-native';
import AnodinaRegular from "./AnodinaRegular";
import {useEffect} from "react";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";

export function Header(props) {
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
        <View style={{flexDirection: 'row', justifyContent: 'center', position: 'relative'}}>

            {props.showBack ?
                <TouchableOpacity onPress={() => props.navigation.goBack()}
                                  style={{position: 'absolute', left: 15, top: 12}}>
                    <Ionicons name="md-arrow-back" size={32} color="black"/>
                </TouchableOpacity>
                : null}

            <View style={{flexDirection: 'row'}}>
                <Image source={{uri: userData.avatar}}
                       resizeMode="contain"
                       style={{
                           width: 50, height: 50, zIndex: 10, position: 'relative',
                           left: 12,
                       }}/>
                <TouchableOpacity style={{flexDirection: 'row', alignContent: 'center'}}>

                    <View style={{
                        position: 'relative',
                        top: 15,
                        left: -12,
                        paddingVertical: 5,
                        paddingHorizontal: 40,
                        height: 30,
                        borderRadius: 50,
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }}>
                        <AnodinaRegular
                            style={{

                                color: 'white',

                            }}>
                            {userData.name}
                        </AnodinaRegular>
                    </View>
                </TouchableOpacity>
            </View>
        </View>);
}

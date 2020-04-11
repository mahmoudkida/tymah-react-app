import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from "react-native-easy-grid";

import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {getUserData} from '../utils/UserData'
import {useState, useEffect} from "react";
import BubbleText from "../components/BubbleText";
import {Divider} from "react-native-elements";
import AnodinaRegular from "../components/AnodinaRegular";
import {useRef} from "react";
import { Button } from 'react-native-elements';

export default function ChildInformation({ navigation }) {
    const childName = useRef();
    const [name,setName] = useState('');
    const [user, setUser] = useState({});
    const [age, setAge] = useState(7);
    const ages = [4, 5, 6, 7, 8, 9, 10];
    useEffect(() => {
        AsyncStorage.getItem('userData').then((data)=>{
            debugger
            setUser(JSON.parse(data))
        })
        // getUserData().then((data)=>{
        //     debugger
        //     setUser(data)
        // });

    },[]);
    const updateAge = (age)=>{
        setAge(age);
    }
    const saveUserData = async () =>{
        debugger
        if(name == ''){
            alert('Please enter your name')
            return false;
        }
        let data = await AsyncStorage.setItem('userData',
            JSON.stringify({
                avatar: user.avatar,
                name: childName.current.value,
                age: age
            }))
        debugger
        navigation.navigate('Select Character')
    }
    return (
        <View style={[styles.container, {backgroundColor: Colors.green}]}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="md-arrow-back" size={32} color="black"/>
            </TouchableOpacity>

            <ScrollView style={[styles.container, {backgroundColor: Colors.green}]}
                        contentContainerStyle={styles.contentContainer}>
                <Image style={{
                    width: '100%',
                    height: 200,
                    resizeMode: 'contain',
                }}
                       source={{uri: user ? user.avatar : ''}}/>

                <BubbleText
                    style={[styles.PageTitle, {color: Colors.purple}]}>
                    What should I call you?
                </BubbleText>
                <TextInput
                    ref={childName}
                    style={{
                        height: 70,
                        width: '90%',
                        borderColor: 'gray',
                        borderWidth: 1,
                        borderRadius: 50,
                        textAlign: 'center',
                        fontFamily: 'anodina-regular',
                        backgroundColor: '#fff',
                        fontSize: 24
                    }}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholder="Enter Your Name..."
                />
                <Divider style={{marginVertical: 10}}/>
                <BubbleText
                    style={[styles.PageTitle, {color: Colors.purple}]}>
                    How old are you?
                </BubbleText>
                <Row style={{
                    width: '90%',
                    borderWidth: 1,
                    borderRadius: 30,
                    backgroundColor: '#fff',
                    justifyContent:'center',
                    alignItems:'center',
                    paddingLeft:30,
                    paddingTop:20,
                    paddingBottom:10
                }}>
                    {ages.map((item, index) => {
                        return (
                            <Col  key={index} onPress={() => {
                                updateAge(item);
                            }} style={{textAlign:'center'}}>
                                <AnodinaRegular style={[
                                    styles.ageItem, age === item ? styles.activeAge : {}
                                ]}>
                                    {item}
                                </AnodinaRegular>
                            </Col>
                        )
                    })}
                </Row>
                <View style={styles.years}>
                    <Text style={{fontSize:15,fontFamily:'anodina-bold'}}>Years</Text>
                </View>

                <View style={{position:'relative', marginTop:60,overflow:'visible',marginBottom:60}}>
                    <Button onPress={saveUserData} buttonStyle={{
                        backgroundColor:Colors.red,
                        paddingHorizontal:120,
                        paddingVertical:15,
                        textAlign:'center',
                        borderRadius:50

                    }}
                            titleStyle={{
                                fontFamily:'anodina-regular',
                                fontSize:22
                            }}
                            title="Next"

                    />
                    <Image source={require('../assets/images/button-arrow.png')}
                    style={{position:'absolute',right:-40,top:-20,width:100,height:100}}
                    />
                </View>

            </ScrollView>


        </View>
    );
}

ChildInformation.navigationOptions = {
    header: null,
};


const styles = StyleSheet.create({
    ageItem: {
        fontSize: 20,
    },
    activeAge: {
        fontSize: 34,
        fontWeight: 'bold',
        position: 'relative',
        top: -7,
        color:Colors.purple
    },
    years: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 30,
        top: -3,
        position: 'relative',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
        alignItems: 'center'
    },
    PageTitle: {
        fontSize: 28,
        textAlign: 'center',
        marginVertical: 20

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
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
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
    }

});

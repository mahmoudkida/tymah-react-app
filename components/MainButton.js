import * as React from 'react';
import {Image, ImageBackground, TouchableOpacity} from 'react-native';
import BubbleText from "./BubbleText";

export function MainButton(props) {

    return (
        <TouchableOpacity
            onPress={props.handler}
            style={{
                width: '85%',
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                marginHorizontal: 'auto'
            }}>
            <ImageBackground
                imageStyle={{borderRadius: 50}}
                style={{
                    flex: 1,
                    paddingVertical: 20,
                    borderRadius: 50,
                    flexDirection: 'row', alignContent: 'center', justifyContent: 'center'
                }}
                source={props.backgroundImage}>
                <Image
                    style={{width: 60, height: 60, marginRight: 20}}
                    source={props.buttonIcon}/>
                <BubbleText
                    style={{
                        fontSize: 30,
                        marginVertical: 10,
                        alignContent: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}
                >
                    {props.text}
                </BubbleText>
            </ImageBackground>
        </TouchableOpacity>
    );
}

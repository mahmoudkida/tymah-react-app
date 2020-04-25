import * as React from 'react';
import {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import FOODS_QUERY from "../quiries/foods";
import {withApollo} from "react-apollo";
import URLs from "../constants/URLs";
import BubbleText from "../components/BubbleText";
import AnodinaRegular from "../components/AnodinaRegular";
import Colors from "../constants/Colors";

class Card extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={[styles.card, {
                backgroundColor: this.props.backgroundColor,
                borderWidth: 1,
                borderColor: Colors.green,
                paddingHorizontal: 20,
                paddingVertical: 60, borderRadius: 10,
            }]}>
                <Image source={{uri: URLs.API_URL + this.props.Image.url}}
                       style={{width: 100, height: 100, marginBottom: 30}}
                       resizeMode="contain"/>
                <BubbleText style={{fontSize: 30}}>{this.props.Name}</BubbleText>
                <View style={{height: 1, width: '100%', backgroundColor: "#eee", marginVertical: 10}}/>
                <AnodinaRegular style={{textAlign: 'justify', fontSize: 16}}>
                    {this.props.Description}
                </AnodinaRegular>
            </View>
        )
    }
}

class NoMoreCards extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text style={styles.noMoreCardsText}>No more cards</Text>
                <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                    <Image source={require('../assets/images/button-arrow-reverse.png')}
                           style={{width: 100, height: 100}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

class HealthInformation extends Component {
    constructor(props) {
        super(props);
        this.fetchData = this.fetchData.bind(this);
        this.state = {
            cards: [],
            loading: false
        };
    }

    componentDidMount() {
        this.fetchData(this.props);
    }

    async fetchData(props) {
        const {client} = props;
        const result = await client.query({
            query: FOODS_QUERY, /* other options, e.g. variables: {} */
        });

        this.setState({
            cards: result.data.foods,
            loading: false,
        });
    }

    handleYup(card) {
        console.log(`Yup for ${card.text}`)
    }

    handleNope(card) {
        console.log(`Nope for ${card.text}`)
    }

    handleMaybe(card) {
        console.log(`Maybe for ${card.text}`)
    }


    render() {
        // If you want a stack of cards instead of one-per-one view, activate stack mode
        // stack={true}
        return (

            <SwipeCards
                cards={this.state.cards.sort(function () {
                    return .5 - Math.random();
                })}
                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards navigation={this.props.navigation}/>}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
                handleMaybe={this.handleMaybe}
                hasMaybeAction
            />
        )
    }
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,

    },
    noMoreCardsText: {
        fontSize: 22,
    }
})

export default withApollo(HealthInformation);
